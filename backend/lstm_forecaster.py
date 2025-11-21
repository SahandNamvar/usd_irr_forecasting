import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"
os.environ["TF_DETERMINISTIC_OPS"] = "1"
os.environ["TF_CUDNN_DETERMINISTIC"] = "1"

import json
import pickle
import numpy as np
import pandas as pd
from datetime import timedelta
from pathlib import Path

DATASET = Path(__file__).parent / "db" / "Dollar_Rial_Price_Dataset.csv"
MODEL_DIR = Path(__file__).parent / "model"
EXPORT_PATH = MODEL_DIR.parent.parent  / "data" / "forecast_data.json"

def forecast_next_day():
    from keras.models import load_model

    model_path = MODEL_DIR / "best_lstm_model.keras"
    scaler_path = MODEL_DIR / "lstm_scaler.pkl"
    residuals_path = MODEL_DIR.parent.parent / "frontend" / "data" / "lstm_results.json"

    # Validate essential files exist
    if not model_path.exists() or not scaler_path.exists() or not residuals_path.exists():
        print("Missing model, scaler, or residuals file. Forecast aborted.")
        return

    model = load_model(model_path, compile=False)

    with open(scaler_path, "rb") as f:
        scaler = pickle.load(f)

    with open(residuals_path, "r") as f:
        results = json.load(f)

    res_mean = results["residual_summary"]["mean_residual"]
    res_std = results["residual_summary"]["residual_std"]

    df = pd.read_csv(DATASET)
    df["Gregorian Date"] = pd.to_datetime(df["Gregorian Date"])
    df = df.sort_values("Gregorian Date").set_index("Gregorian Date")

    close_series = df["Close Price"]
    log_prices = np.log(close_series)

    lookback = 90
    last_window = log_prices[-lookback:].values.reshape(-1, 1)
    last_scaled = scaler.transform(last_window).reshape(1, lookback, 1)

    y_scaled = model.predict(last_scaled)
    y_log = scaler.inverse_transform(y_scaled)[0, 0]

    forecast_center = np.exp(y_log) + res_mean
    tomorrow = close_series.index[-1] + timedelta(days=1)

    entry = build_entry(tomorrow, forecast_center, close_series.iloc[-1], res_std)

    EXPORT_PATH.parent.mkdir(parents=True, exist_ok=True)

    # Load existing forecast data safely
    if EXPORT_PATH.exists():
        try:
            with open(EXPORT_PATH, "r") as f:
                data = json.load(f)
            if not isinstance(data, list):
                data = []
        except Exception:
            data = []
    else:
        data = []

    data.append(entry)

    with open(EXPORT_PATH, "w") as f:
        json.dump(data, f, indent=4)

    print(f"Forecast for {tomorrow.date()} saved: {int(forecast_center)}")

def build_entry(tomorrow, forecast_center, today_price, res_std):
    if tomorrow.weekday() == 4:  # Friday
        return {
            "date": str(tomorrow.date()),
            "weekend": True,
            "status": "market closed",
            "forecast": None,
            "ci_68": None,
            "ci_95": None,
            "trend": "stable"
        }

    trend = (
        "up" if forecast_center > today_price
        else "down" if forecast_center < today_price
        else "stable"
    )

    ci_68 = (forecast_center - res_std, forecast_center + res_std)
    ci_95 = (forecast_center - 1.96 * res_std, forecast_center + 1.96 * res_std)

    return {
        "date": str(tomorrow.date()),
        "weekend": False,
        "status": "market open",
        "forecast": int(forecast_center),
        "ci_68": (int(ci_68[0]), int(ci_68[1])),
        "ci_95": (int(ci_95[0]), int(ci_95[1])),
        "trend": trend
    }

if __name__ == "__main__":
    forecast_next_day()
