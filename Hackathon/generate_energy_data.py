import pandas as pd
import numpy as np

np.random.seed(42)

# Buildings from the Energy UI Card
buildings = {
    "Academic Block A": 450,
    "Academic Block B": 450,
    "Engineering Labs": 500,
    "Student Center": 350,
    "Library Complex": 300,
    "Hostel Blocks": 600
}


# 24 hours of data
timestamps = pd.date_range(
    start="2026-02-01 00:00",
    periods=24,
    freq="h"
)

rows = []

for time in timestamps:
    hour = time.hour
    temperature_factor = 1.2 if 11 <= hour <= 17 else 0.9

    for building, max_capacity in buildings.items():
        occupancy = np.clip(np.random.normal(0.7, 0.15), 0.3, 1.0)

        base_load = max_capacity * occupancy * temperature_factor

        solar_generation = 0
        if 8 <= hour <= 16:
            solar_generation = np.random.uniform(200, 450)

        energy_kwh = base_load + np.random.normal(0, 20)

        rows.append([
            time,
            building,
            round(energy_kwh, 2),
            round(solar_generation, 2),
            round(occupancy, 2),
            max_capacity
        ])

df = pd.DataFrame(
    rows,
    columns=[
        "timestamp",
        "building",
        "energy_kwh",
        "solar_kwh",
        "occupancy",
        "max_capacity_kw"
    ]
)

df.to_csv("energy_data.csv", index=False)

print("Dataset generated successfully")
print(df.head())
