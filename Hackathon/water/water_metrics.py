import pandas as pd
import os

def get_water_metrics():
    # Check if file exists
    if not os.path.exists("water_data.csv"):
        return []

    # 1. Read the CSV
    df = pd.read_csv("water_data.csv")
    
    # 2. Ensure date column is datetime
    df['date'] = pd.to_datetime(df['date'])
    
    # 3. Aggregate by Month (matching your chart's X-Axis)
    # We use 'M' for month end frequency
    monthly = df.resample('M', on='date').sum().reset_index()
    
    # 4. Format for Frontend
    # React expects keys: "month", "consumption", "recycled"
    formatted_data = []
    for index, row in monthly.iterrows():
        formatted_data.append({
            "month": row['date'].strftime("%b"), # Converts "2025-01-31" to "Jan"
            "consumption": round(row['total_consumption_m3'], 2),
            "recycled": round(row['recycled_m3'], 2)
        })
        
    # Return the last 6 months to fit the UI
    return formatted_data[-6:]