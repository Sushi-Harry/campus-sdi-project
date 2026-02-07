import pandas as pd
import os
from sklearn.linear_model import LinearRegression

def analyze_carbon_intelligence():
    # Load your real audit data
    file_path = "carbon/carbon_data.csv" if os.path.exists("carbon/carbon_data.csv") else "carbon_data.csv"
    df = pd.read_csv(file_path)
    df['total'] = df['scope1'] + df['scope2'] + df['scope3']
    
    # --- Prediction Intelligence (Linear Regression) ---
    X = df[['year']].values
    y = df['total'].values
    model = LinearRegression().fit(X, y)
    
    # Find the year where emissions intercept zero: 0 = mx + c => x = -c/m
    m, c = model.coef_[0], model.intercept_
    projected_year = int(-c / m)
    
    # --- Trajectory Logic ---
    latest = df.iloc[-1]
    current_total = latest['total']
    baseline_2019 = df.iloc[0]['total']
    
    # Target path for 2025 (Net Zero by 2030)
    target_2025 = baseline_2019 * (5 / 11) 
    debt = round(current_total - target_2025, 1)
    
    # Dynamic Recommendations
    recommendations = []
    if projected_year > 2030:
        recommendations.append(f"Timeline Alert: At current speed, Net-Zero will be reached in {projected_year}. Need 12% faster reduction to hit 2030.")
    
    if latest["scope2"] > (current_total * 0.4):
        recommendations.append("Scope 2 Optimization: High grid reliance. Recommendation: Deploy 250kW solar array.")

    return {
        "current_total": int(current_total),
        "debt": debt,
        "is_alert": debt > 50,
        "recommendations": recommendations,
        "projected_year": projected_year,
        "status": "Delayed" if projected_year > 2030 else "On Track"
    }