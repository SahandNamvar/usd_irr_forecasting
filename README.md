## USD–IRR Exchange Rates & Forecasting Model

This repository contains historical **USD to IRR (US Dollar → Iranian Rial)** exchange rate data and a forecasting model built using **LSTM (Long Short-Term Memory)** neural networks.

The goal of this project is to analyze long-term exchange rate behavior and generate short-term forecasts using a **univariate time-series** approach trained on over 14 years of daily data.

The project includes:

- A full **Exploratory Data Analysis (EDA)** notebook
- A **model training and evaluation** notebook
- Automated scripts for **downloading, preprocessing, and forecasting**
- A static website displaying results and insights

📌 **Project Website:** [USD IRR Forecasting](https://sahandnamvar.github.io/usd_irr_forecasting/)

---

### Local Setup & Usage

Follow the steps below to run the project on your local machine:

1. **Clone the repository:**

   ```
   git clone https://github.com/SahandNamvar/usd_irr_forecasting.git
   cd usd_irr_forecasting
   ```

2 **Create & Activate a Virtual Environment:**

_Using `venv`:_

    ```
    python3 -m venv venv
    source venv/bin/activate        # macOS / Linux
    venv\Scripts\activate.bat       # Windows
    ```

_Using `conda`:_

    ```
    conda create -n usd_irr_forecasting python=3.10.19
    conda activate usd_irr_forecasting
    ```

3 . **Install Dependencies:**

    ```
    cd backend
    pip install -r requirements.txt
    ```

**(Optional) Kaggle API Setup:**

If you want the dataset to download automatically:

1. Obtain Kaggle API token → [Kaggle Public API Documentation](https://www.kaggle.com/docs/api)
2. In `backend/`, create a `.env` file with:

   ```
   KAGGLE_USERNAME=your_kaggle_username
   KAGGLE_KEY=your_kaggle_key
   ```

Or place your kaggle.json file in:

- `~/.kaggle/` (macOS / Linux)
- `C:\Users\<YourUsername>\.kaggle\` (Windows)

_Alternative:_
You may download the dataset manually from Kaggle or GitHub and place it inside the `backend/dataset` directory.
If the dataset already exists locally, you can skip the downloader script.

---

### Running the Pipeline

From inside the `backend/` directory, run the scripts in order:

1. **Download dataset (optional):**

   ```
   python dataset_downloader.py
   ```

Downloads the raw dataset into `backend/db/`

2. **Preprocess dataset:**

   ```
   python dataset_preprocessor.py
   ```

Cleans and preprocesses the data, saving the output into `data/`

3. **Run the Forecasting Model:**

   ```
   python lstm_forecaster.py
   ```

Generates tomorrow’s USD–IRR forecast using the trained LSTM model and saves results into `data/`

---

### View the Website Locally

From the root directory, run:

    ```
    python -m http.server 8000
    ```

Then open your browser and navigate to `http://localhost:8000` to view the static website displaying the results.

_Or use the VSCode **Live Server extension**_

---

### Prerequisites

- Python 3.10.19 (recommended)
- Required libraries (see `backend/requirements.txt`)
- Optional: Kaggle API key (for automatic dataset download)
- Run scripts in this order:
  1. `dataset_downloader.py`
  2. `dataset_preprocessor.py`
  3. `lstm_forecaster.py`

---

### Commentary (Notes)

Working with financial time series introduces many challenges such as **non-stationarity, volatility clustering, unpredictable shocks, and market anomalies**. For this project, another major difficulty was sourcing reliable **USD to IRR** historical data. Iranian currency data is notoriously hard to obtain, and even major platforms (including Google) still show outdated 2018 values.

After researching multiple sources, I identified **TGJU.org (Tehran Gold & Jewelry Union)** as a reliable provider of historical exchange rates. The dataset used in this project was compiled by **Koorosh Komeili Zadeh**, publicly available on GitHub and Kaggle.

Once the data was collected, I performed extensive **Exploratory Data Analysis (EDA)** to understand its structure, trends, anomalies, and seasonality. The preprocessing stage involved handling missing days, outliers, non-business days, and structural breaks before training the LSTM forecasting model.

**Limitations:**

Despite experimentation with several models — **Naive Forecast, ARIMA, SARIMA, Prophet, and LSTM** (used here) — the LSTM often struggles to outperform the naive baseline. This is largely due to the nature of the Iranian exchange market:

- The USD–IRR rate is heavily influenced by **external geopolitical and policy events**.
- These external drivers are **not present in the historical price data**, making a strictly univariate model inherently limited.
- The dataset includes **gaps** (weekends/holidays), and methods like interpolation, differencing, or forward-filling may create artifacts the model learns incorrectly.

For these reasons, while the LSTM can capture **short-term momentum**, it cannot predict **sudden spikes or crashes** driven by government policy, sanctions, political instability, or macroeconomic shocks.

**Future Improvements:**

This project is a work in progress. Future iterations may incorporate:

- **Exogenous variables** (oil prices, inflation, sanctions data, interest rates, etc.)
- Additional ML/DL models
- Better gap-handling and feature engineering
- Multivariate forecasting architectures

---

### Why This Project?

More than a simple course assignment, this project was an opportunity to combine multiple domains of interest:

- Time series analysis
- Deep learning
- Data engineering and preprocessing pipelines
- Financial modeling
- Web development and visualization

---

### Citation

Dollar-Rial-Toman Live Price Dataset

Author: Koorosh Komeili Zadeh

Source: https://github.com/kooroshkz/Dollar-Rial-Toman-Live-Price-Dataset

Data Source: TGJU.org (Tehran Gold & Jewelry Union)

Date Range: November 2011 - Present
