import pandas as pd
import numpy as np

def analyze_carbon_intelligence():
    # Load historical carbon data
    df = pd.read_csv("carbon/carbon_data.csv")
    
    # 1. Net Zero Debt Analysis
    latest = df.iloc[-1]
    total_emissions = latest["scope1"] + latest["scope2"] + latest["scope3"]
    
    # Target: Linear reduction baseline for 2025
    baseline_2019 = df.iloc[0]["scope1"] + df.iloc[0]["scope2"] + df.iloc[0]["scope3"]
    target_2025 = baseline_2019 * (1 - (2025-2019)/(2030-2019))
    
    carbon_debt = round(total_emissions - target_2025, 2)
    is_alert = carbon_debt > 100 # High debt threshold
    
    # 2. Strategic Recommendations
    recommendations = []
    if carbon_debt > 0:
        recommendations.append(f"Carbon Debt Alert: Currently {carbon_debt}t above 2030 trajectory.")
    if latest["scope2"] > (total_emissions * 0.4):
        recommendations.append("High Grid Reliance: Increase solar offset to lower Scope 2 impact.")
    if latest["scope1"] > 400:
        recommendations.append("Direct Emissions Peak: Audit natural gas usage in heating systems.")

    return {
        "current_total": round(total_emissions, 0),
        "debt": carbon_debt,
        "is_alert": is_alert,
        "recommendations": recommendations,
        "status": "Critical" if is_alert else "Optimal"
    }