export function populateRecentRatesTable(rows) {
  const tbody = document.querySelector("#recent-rates-table tbody");
  tbody.innerHTML = "";

  rows.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${row["Gregorian Date"]}</td>
            <td>${row["Persian Date"]}</td>
            <td>${Number(row["Open Price"]).toLocaleString()}</td>
            <td>${Number(row["Low Price"]).toLocaleString()}</td>
            <td>${Number(row["High Price"]).toLocaleString()}</td>
            <td>${Number(row["Close Price"]).toLocaleString()}</td>
        `;
    tbody.appendChild(tr);
  });
}
