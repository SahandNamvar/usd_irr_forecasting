from dotenv import load_dotenv
from pathlib import Path
import sys
import os

env_path = Path(__file__).parent / ".env"

if env_path.exists():
    load_dotenv(dotenv_path=env_path)

KAGGLE_USERNAME = os.getenv("KAGGLE_USERNAME")
KAGGLE_KEY = os.getenv("KAGGLE_KEY")

if not KAGGLE_USERNAME or not KAGGLE_KEY:
    print("Missing Kaggle credentials.")
    print("KAGGLE_USERNAME:", KAGGLE_USERNAME)
    print("KAGGLE_KEY:", "SET" if KAGGLE_KEY else "NOT SET")
    sys.exit(1)

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
