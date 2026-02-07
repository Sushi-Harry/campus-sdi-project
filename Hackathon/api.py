from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os
import requests 
import datetime

# Internal Logic Imports
from energy_live import update_energy_state
from energy_model import predict_solar_impact, predict_occupancy_intelligence
from water.water_metrics import get_water_metrics
from water.water_model import simulate_water_conservation 
from waste.waste_metrics import get_waste_metrics
from waste.waste_model import simulate_diversion
from carbon.carbon_model import analyze_carbon_intelligence

# App Initialization
app = FastAPI(title="Campus Digital Twin API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- ENERGY INTELLIGENCE ---

@app.get("/energy/live")
def get_live_energy():
    """
    Unified Energy Feed: Provides live load, solar, vitality, and alerts.
    Merged to fix the 'Infinite Loading' bug.
    """
    state = update_energy_state() 
    
    # 1. Vitality Intelligence
    solar_ratio = (state["solar_gen"] / state["total_load"]) if state["total_load"] > 0 else 0
    state["vitality_score"] = round(min(100, solar_ratio * 200), 1)
    
    # 2. Graph Synchronization (Fixes broken charts)
    state["formatted_time"] = datetime.datetime.now().strftime("%H:%M:%S")
    
    # 3. Energy Debt & Alert Logic
    # Debt is calculated as load exceeding a 2500kW sustainability threshold
    state["energy_debt"] = max(0, round(state["total_load"] - 2500, 2))
    state["is_alert"] = state["energy_debt"] > 100
    
    # 4. Dynamic Recommendation System
    recs = []
    if state["is_alert"]:
        recs.append(f"Grid Overload: Campus is {state['energy_debt']}kW above efficiency threshold.")
        recs.append("Recommendation: Shift heavy equipment load to solar peak (11AM - 2PM).")
    else:
        recs.append("System Optimal: Current solar offset meeting sustainability targets.")
    
    state["recommendations"] = recs
    return state

@app.get("/energy/monthly")
def get_monthly_trends():
    if not os.path.exists("energy_data.csv"): return []
    df = pd.read_csv("energy_data.csv")
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    monthly = df.groupby(df['timestamp'].dt.strftime('%b'), sort=False).agg({
        'energy_kwh': 'sum', 'solar_kwh': 'sum'
    }).reset_index()
    monthly.columns = ['month', 'consumption', 'solar']
    return monthly.to_dict(orient="records")

# --- CARBON & WATER INTELLIGENCE ---

@app.get("/carbon/intelligence")
def get_carbon_intelligence():
    """Analyzes 2030 trajectory and returns debt alerts."""
    return analyze_carbon_intelligence()

@app.get("/water/live")
@app.get("/water")
def get_water_live(): 
    """Live water telemetry for the campus dashboard."""
    return { "history": get_water_metrics() }


# --- WASTE & SDG IMPACT ---

@app.get("/waste/live")
def get_waste_live():
    """Provides categorized data for vertical premium graphs."""
    return get_waste_metrics()

@app.get("/sustainability/impact")
@app.get("/sdg/impact")
def get_sdg_impact():
    """Blockchain-ready impact score for Thapar University."""
    return {
        "score": 74,
        "active_sensors": 1247,
        "data_points": "74.2K",
        "reportHash": "Thapar_Sustainability_Audit_2026_Hash_0x99",
        "blockchain_status": "Ready to Mint"
    }

# --- WEATHER ---

@app.get("/weather")
def get_weather():
    url = "https://api.open-meteo.com/v1/forecast?latitude=30.34&longitude=76.39&current_weather=True"
    try:
        res = requests.get(url).json()
        return {"temp": res["current_weather"]["temperature"], "condition": "Clear", "city": "Patiala"}
    except:
        return {"temp": 24, "condition": "Clear", "city": "Patiala (Offline)"}