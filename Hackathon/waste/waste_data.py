import pandas as pd
import numpy as np

np.random.seed(42)

days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

data = []

for day in days:
    total = np.random.randint(2200, 3200)

    composted = int(total * np.random.uniform(0.35, 0.45))
    recycled = int(total * np.random.uniform(0.30, 0.40))
    landfill = total - (composted + recycled)

    data.append({
        "day": day,
        "total_kg": total,
        "composted_kg": composted,
        "recycled_kg": recycled,
        "landfill_kg": landfill
    })

df = pd.DataFrame(data)
df.to_csv("waste/waste_data.csv", index=False)

print("Waste dataset generated successfully")
