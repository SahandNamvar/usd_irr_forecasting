export function renderLSTMResults(data) {
  const rmseElem = document.getElementById("model-metric__RMSE");
  rmseElem.textContent = data.test_metrics.RMSE.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const maeElem = document.getElementById("model-metric__MAE");
  maeElem.textContent = data.test_metrics.MAE.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const maeItem = document.getElementById("maeItem");
  maeItem.innerHTML = `<strong>MAE:</strong> Prediction is usually off by around ${data.test_metrics.MAE.toLocaleString(
    undefined,
    { minimumFractionDigits: 0, maximumFractionDigits: 0 }
  )} IRR`;

  const mapeElem = document.getElementById("model-metric__MAPE");
  mapeElem.textContent =
    data.test_metrics.MAPE_percent.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + "%";
  const mapeItem = document.getElementById("mapeItem");
  mapeItem.innerHTML = `<strong>MAPE:</strong> Prediction is typically within ${data.test_metrics.MAPE_percent.toLocaleString(
    undefined,
    { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  )}% of actual value`;

  const meanResidualElem = document.getElementById(
    "model-metric__MeanResidual"
  );
  meanResidualElem.textContent =
    data.residual_summary.mean_residual.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const stdResidualElem = document.getElementById("model-metric__ResidualStd");
  stdResidualElem.textContent =
    data.residual_summary.residual_std.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
}
