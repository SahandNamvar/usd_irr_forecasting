import { renderForecast } from "../components/forecastRenderer.js";
import { renderLSTMResults } from "../components/lstmRenderer.js";

export async function fetchForecastData() {
  try {
    const response = await fetch(
      new URL("../../data/forecast_data.json", import.meta.url)
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // data is an array of forecast objects
    const lastestForecast = data[data.length - 1]; // Get the latest forecast

    renderForecast(lastestForecast);

    // Then fetch and render LSTM results from model folder
    if (
      lastestForecast.weekend === false &&
      lastestForecast.status !== "market closed"
    ) {
      // Check market status (Should be done on backend ideally)
      await fetchLSTMResults();
    } else {
      console.log("Market is closed or weekend; skipping LSTM results fetch.");
    }
  } catch (error) {
    console.error("Error fetching forecast data:", error);
  }
}

async function fetchLSTMResults() {
  try {
    const response = await fetch(
      new URL("../../data/lstm_results.json", import.meta.url)
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const lstmData = await response.json();
    renderLSTMResults(lstmData); // Render LSTM results
  } catch (error) {
    console.error("Error fetching LSTM results:", error);
  }
}
