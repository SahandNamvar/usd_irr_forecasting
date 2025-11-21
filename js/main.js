import { setupChartToggleButtons } from "./charts/chartToggles.js";
import { fetchExchangeData } from "./fetchers/fetch_exchange_data.js";
import { fetchForecastData } from "./fetchers/fetch_forecast_data.js";

document.addEventListener("DOMContentLoaded", function () {
  setupChartToggleButtons();
  fetchExchangeData();
  fetchForecastData();
});
