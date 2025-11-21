import { setupChartToggleButtons } from "./charts/chartToggles.js";
import { fetchExchangeData } from "./fetchers/fetch_exchange_data.js";

document.addEventListener("DOMContentLoaded", function () {
  setupChartToggleButtons();
  fetchExchangeData();
});
