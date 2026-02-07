import pandas as pd
import numpy as np

np.random.seed(42)

dates = pd.date_range(start="2025-01-01", end="2025-06-30", freq="D")

data = []

for d in dates:
    month = d.month

    # Base campus consumption
    consumption = np.random.normal(2800, 150)

    # Recycled water ~ 35–40%
    recycled = consumption * np.random.uniform(0.34, 0.40)

    # Rainwater harvesting (monsoon boost)
    if month in [6, 7, 8, 9]:  # Indian monsoon
        rainwater = np.random.uniform(150, 300)
    else:
        rainwater = np.random.uniform(20, 80)

    # Treatment efficiency
    efficiency = np.random.uniform(0.92, 0.97)

    treated_output = consumption * efficiency
    loss = consumption - treated_output

    data.append([
        d.date(),
        round(consumption, 2),
        round(recycled, 2),
        round(rainwater, 2),
        round(treated_output, 2),
        round(efficiency * 100, 2),
        round(loss, 2)
    ])

df = pd.DataFrame(
    data,
    columns=[
        "date",
        "total_consumption_m3",
        "recycled_m3",
        "rainwater_harvested_m3",
        "treated_output_m3",
        "treatment_efficiency_percent",
        "loss_m3"
    ]
)

df.to_csv("water/water_data.csv", index=False)

print("Water dataset generated successfully")
print(df.head())
