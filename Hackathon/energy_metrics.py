import pandas as pd

# 1. Load dataset
df = pd.read_csv("energy_data.csv")

print("Dataset loaded")
print(df.head())

# 2. Get latest timestamp (current state)
latest_time = df["timestamp"].max()
latest = df[df["timestamp"] == latest_time]

print("\nLatest snapshot:")
print(latest)

# 3. CURRENT LOAD
current_load = latest["energy_kwh"].sum()

# 4. SOLAR GENERATION
solar_generation = latest["solar_kwh"].sum()

# 5. GRID IMPORT
grid_import = current_load - solar_generation

# 6. BUILDING EFFICIENCY
latest["efficiency_percent"] = (
    latest["energy_kwh"] / latest["max_capacity_kw"] * 100
).round(0)

# 7. Final response structure (what frontend will consume)
response = {
    "current_load": round(current_load, 2),
    "solar_generation": round(solar_generation, 2),
    "grid_import": round(grid_import, 2),
    "building_efficiency": []
}

for _, row in latest.iterrows():
    response["building_efficiency"].append({
        "name": row["building"],
        "current_load": round(row["energy_kwh"], 2),
        "max_capacity": row["max_capacity_kw"],
        "efficiency": int(row["efficiency_percent"])
    })

print("\n=== ENERGY PAGE METRICS ===")
print(response)
