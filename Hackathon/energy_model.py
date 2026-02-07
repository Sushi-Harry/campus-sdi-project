import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

_model = None
_df = None

def load_model():
    global _model, _df
    if _model is not None:
        return _model, _df

    # Loads your real-time dataset
    df = pd.read_csv("energy_data.csv")
    df["hour"] = pd.to_datetime(df["timestamp"]).dt.hour

    # Training on Occupancy, Solar, and Time
    X = df[["occupancy", "solar_kwh", "hour"]]
    y = df["energy_kwh"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    model = LinearRegression()
    model.fit(X_train, y_train)

    _model = model
    _df = df
    return model, df

# ✅ NEW: Intelligence for predicting surges based on student activity
def predict_occupancy_intelligence(extra_occupancy_percent=20):
    model, df = load_model()
    latest = df[df["timestamp"] == df["timestamp"].max()].copy()
    baseline = latest["energy_kwh"].sum()

    # Simulation: Scale current occupancy up
    latest["occupancy"] = (latest["occupancy"] + (extra_occupancy_percent / 100)).clip(0, 1)
    
    predicted = model.predict(latest[["occupancy", "solar_kwh", "hour"]]).sum()
    
    # Vitality Score: How well the campus handles the extra load
    vitality_impact = min(100, max(0, 100 - ((predicted - baseline) / baseline * 100)))

    return {
        "predicted_surge": round(predicted - baseline, 2),
        "vitality_score": round(vitality_impact, 1)
    }

def predict_solar_impact(extra_solar_kw=500):
    model, df = load_model()
    latest = df[df["timestamp"] == df["timestamp"].max()].copy()
    baseline = latest["energy_kwh"].sum()
    latest["solar_kwh"] += extra_solar_kw
    predicted = model.predict(latest[["occupancy", "solar_kwh", "hour"]]).sum()
    return {
        "baseline": round(baseline, 2),
        "predicted": round(predicted, 2),
        "reduction": round(baseline - predicted, 2)
    }