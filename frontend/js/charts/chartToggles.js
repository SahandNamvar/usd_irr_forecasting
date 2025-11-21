import { updateChartType } from "./chartManager.js";

export function setupChartToggleButtons() {
  const buttons = document.querySelectorAll(".chart-toggle");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("chart-toggle--active"));
      btn.classList.add("chart-toggle--active");

      updateChartType(btn.dataset.chart);
    });
  });
}
