import { setArrowIndicator } from "../utils/arrowIndicator.js";

export function renderStats(meta) {
  document.getElementById("stat-total-records").textContent =
    meta.total_records.toLocaleString();

  document.getElementById("stat-last-updated").textContent = meta.last_update;

  document.getElementById("stat-close-price").textContent =
    meta.last_close_price.toLocaleString();

  document.getElementById("stat-lowest-price").textContent =
    meta.lowest_close_price.toLocaleString();

  document.getElementById(
    "stat-data-range"
  ).textContent = `${meta.data_range[0]} – Present`;

  const amountElem = document.getElementById("stat-change-amount");
  amountElem.querySelector(".value-text").textContent =
    meta.change_amount_yesterday.toLocaleString();
  setArrowIndicator(
    amountElem.querySelector(".arrow-icon"),
    meta.change_amount_yesterday
  );

  const percentElem = document.getElementById("stat-change-percent");
  percentElem.querySelector(".value-text").textContent =
    meta.change_percent_yesterday.toFixed(2) + "%";
  setArrowIndicator(
    percentElem.querySelector(".arrow-icon"),
    meta.change_percent_yesterday
  );
}
