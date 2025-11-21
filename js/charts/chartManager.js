let chart = null;
let candleSeries = null;
let lineSeries = null;
let areaSeries = null;

export function initPriceChart(chartsData) {
  const container = document.getElementById("price-chart");

  const { createChart, CrosshairMode } = LightweightCharts;

  chart = createChart(container, {
    width: container.clientWidth || 800,
    height: container.clientHeight || 400,
    layout: {
      background: { color: "#050816" },
      textColor: "#cbd5f5",
      fontFamily: "Space Grotesk, system-ui, sans-serif",
    },
    grid: {
      vertLines: { color: "#151823" },
      horzLines: { color: "#151823" },
    },
    rightPriceScale: { borderColor: "#1f2937" },
    timeScale: {
      borderColor: "#1f2937",
      timeVisible: true,
      secondsVisible: false,
    },
    crosshair: { mode: CrosshairMode.Normal },
  });

  candleSeries = chart.addCandlestickSeries({
    upColor: "#10b981",
    downColor: "#ef4444",
    borderUpColor: "#10b981",
    borderDownColor: "#ef4444",
    wickUpColor: "#10b981",
    wickDownColor: "#ef4444",
  });
  candleSeries.setData(chartsData.candlestick_chart);

  lineSeries = chart.addLineSeries({ lineWidth: 2, color: "#60a5fa" });
  lineSeries.setData(chartsData.line_area_chart);

  areaSeries = chart.addAreaSeries({
    lineWidth: 2,
    lineColor: "#60a5fa",
    topColor: "rgba(96,165,250,0.4)",
    bottomColor: "rgba(15,23,42,0.0)",
  });
  areaSeries.setData(chartsData.line_area_chart);

  lineSeries.applyOptions({ visible: false });
  areaSeries.applyOptions({ visible: false });

  chart.timeScale().fitContent();

  window.addEventListener("resize", () => {
    chart.resize(container.clientWidth, container.clientHeight);
  });
}

export function updateChartType(type) {
  if (!chart) return;

  const show = (series, visible) => series && series.applyOptions({ visible });

  show(candleSeries, type === "candlestick");
  show(lineSeries, type === "line");
  show(areaSeries, type === "area");
}
