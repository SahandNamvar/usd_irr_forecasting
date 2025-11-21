import { initPriceChart } from "../charts/chartManager.js";
import { renderStats } from "../components/statsRenderer.js";
import { populateRecentRatesTable } from "../components/tableRenderer.js";

export async function fetchExchangeData() {
  try {
    const response = await fetch("/frontend/data/exchange_data.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // data contains meta, charts, and tables

    renderStats(data.meta);
    initPriceChart(data.charts);
    populateRecentRatesTable(data.tables.recent_rates);
  } catch (error) {
    console.error("Error fetching exchange data:", error);
  }
}
