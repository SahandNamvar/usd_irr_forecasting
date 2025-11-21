import { setArrowIndicatorF } from "../utils/arrowIndicator.js";

export function renderForecast(data) {
  // Check if market is closed/weekend (should be handled in backend ideally)
  const weekend = data.weekend;
  const status = data.status;

  if (weekend && status === "market closed") {
    const forecastElem = document.getElementById("stat-tomorrow-forecast");
    forecastElem.querySelector(".value-text").textContent = "Market Closed";
    setArrowIndicatorF(forecastElem.querySelector(".arrow-icon"), data.trend);

    const forecastMetricElem = document.getElementById("model-metric__CI68");
    forecastMetricElem.textContent = "—";

    const forecastMetricElem2 = document.getElementById("model-metric__CI95");
    forecastMetricElem2.textContent = "—";

    const forecastedClosingPriceElem = document.getElementById(
      "model-metric__ForecastedClosingPrice"
    );
    forecastedClosingPriceElem.textContent = "Market Closed";
  } else {
    const forecastElem = document.getElementById("stat-tomorrow-forecast");
    forecastElem.querySelector(".value-text").textContent =
      data.forecast.toLocaleString();
    setArrowIndicatorF(forecastElem.querySelector(".arrow-icon"), data.trend);

    const forecastMetricElem = document.getElementById("model-metric__CI68");
    forecastMetricElem.textContent = `${data.ci_68[0].toLocaleString()} - ${data.ci_68[1].toLocaleString()}`;

    const forecastMetricElem2 = document.getElementById("model-metric__CI95");
    forecastMetricElem2.textContent = `${data.ci_95[0].toLocaleString()} - ${data.ci_95[1].toLocaleString()}`;

    const ciItem = document.getElementById("ciItem");
    ciItem.innerHTML = `<strong>CI 68% & 95%:</strong> The range within which the true price is expected to fall with 68% and 95% confidence, respectively.`;

    const forecastedClosingPriceElem = document.getElementById(
      "model-metric__ForecastedClosingPrice"
    );
    forecastedClosingPriceElem.textContent = data.forecast.toLocaleString();
  }
}
