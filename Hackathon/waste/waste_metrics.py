import pandas as pd

def get_waste_metrics():
    df = pd.read_csv("waste/waste_data.csv")

    daily_total = int(df["total_kg"].mean())
    composted = int(df["composted_kg"].sum())
    landfill = int(df["landfill_kg"].sum())

    diverted = composted + df["recycled_kg"].sum()
    diversion_rate = round((diverted / df["total_kg"].sum()) * 100, 1)

    weekly = df.to_dict(orient="records")

    return {
        "daily_waste": daily_total,
        "diversion_rate": diversion_rate,
        "composted": composted,
        "landfill": landfill,
        "weekly": weekly
    }
