from dotenv import load_dotenv
from pathlib import Path
import sys
import os

load_dotenv()
os.environ["KAGGLE_USERNAME"] = os.getenv("KAGGLE_USERNAME")
os.environ["KAGGLE_KEY"] = os.getenv("KAGGLE_KEY")
from kaggle.api.kaggle_api_extended import KaggleApi

KAGGLE_DATASET = "kooroshkz/dollar-rial-toman-live-price-dataset"
DATASET_DIR = Path(__file__).parent / "db"

def download_dataset():
    DATASET_DIR.mkdir(parents=True, exist_ok=True)
    api = KaggleApi()
    try:
        api.authenticate()
        print("Kaggle API authenticated successfully.")
    except Exception as e:
        print(f"Failed to authenticate Kaggle API: {e}")
        sys.exit(1)

    try:
        api.dataset_download_files(KAGGLE_DATASET, path=DATASET_DIR, unzip=True)
        print(f"Dataset downloaded and extracted to {DATASET_DIR}")
    except Exception as e:
        print(f"Failed to download dataset: {e}")
        sys.exit(1)

if __name__ == "__main__":
    download_dataset()