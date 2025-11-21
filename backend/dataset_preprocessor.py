import json
import pandas as pd
from pathlib import Path

DATASET = Path(__file__).parent / "db" / "Dollar_Rial_Price_Dataset.csv"

def load_dataset(path=DATASET):
    try:
        df = pd.read_csv(path)
        print("Dataset loaded successfully.")
        return df
    except FileNotFoundError:
        print(f"Dataset not found at {path}.")
        return None
    
def prepare_exchange_dataset():
    df = load_dataset()
    if df is None:
        return None
    
    # Convert missing values & data types
    df['Change Amount'] = df['Change Amount'].replace('-', '0').astype(int)
    df['Change Percent'] = df['Change Percent'].replace('-', '0').str.rstrip('%').astype(float)

    # Change column order
    df = df[['Gregorian Date', 'Persian Date', 'Open Price', 
             'Low Price', 'High Price', 'Close Price',
             'Change Amount', 'Change Percent']]
    
    # Metadata
    df['Gregorian Date'] = df['Gregorian Date'].str.replace('/', '-')
    latest_row = df.iloc[df['Gregorian Date'].idxmax()]

    metadata = {
        "total_records": len(df),
        "last_update": latest_row['Gregorian Date'],
        "last_close_price": int(latest_row['Close Price']),
        "lowest_close_price": int(df['Close Price'].min()),
        "data_range": (
            df['Gregorian Date'].min()[:4],
            df['Gregorian Date'].max()[:4]
        ),
        "change_amount_yesterday": int(latest_row['Change Amount']),
        "change_percent_yesterday": float(latest_row['Change Percent'])
    }

    # Chart data
    df_sorted = df.sort_values('Gregorian Date') # Sorted 

    line_area_chart = (
        df_sorted[['Gregorian Date', 'Close Price']]
        .rename(columns={'Gregorian Date': 'time', 'Close Price': 'value'})
        .to_dict(orient='records')
    )

    candlestick_chart = (
        df_sorted[['Gregorian Date', 'Open Price', 'High Price', 'Low Price', 'Close Price']]
        .rename(columns={
            'Gregorian Date': 'time',
            'Open Price': 'open',
            'High Price': 'high',
            'Low Price': 'low',
            'Close Price': 'close'
        })
        .to_dict(orient='records')
    )

    # Table data — already sorted newest first
    recent_rates = df.head(10).drop(columns=['Change Amount', 'Change Percent']).to_dict(orient='records')

    return {
        "meta": metadata,
        "charts": {
            "line_area_chart": line_area_chart,
            "candlestick_chart": candlestick_chart
        },
        "tables": {
            "recent_rates": recent_rates
        }
    }

if __name__ == "__main__":
    exchange_data = prepare_exchange_dataset()

    if exchange_data is None:
        print("Failed to prepare exchange dataset.")
        exit(1)

    print(f"Processed {exchange_data['meta']['total_records']} records successfully.")

    # Export JSON to frontend/data
    export_folder = Path(__file__).parent.parent / "frontend" / "data"
    export_folder.mkdir(parents=True, exist_ok=True)
    export_path = export_folder / "exchange_data.json"

    with open(export_path, "w", encoding="utf-8") as f:
        json.dump(exchange_data, f, ensure_ascii=False, indent=4)

    print(f"File saved successfully: {export_path}") 