const form = document.getElementById("maintenanceForm");
const tableBody = document.getElementById("recordsTable");
const downloadBtn = document.getElementById("downloadJson");
const downloadCsvBtn = document.getElementById("downloadCsv");

// Store records in an array
let records = JSON.parse(localStorage.getItem("maintenanceRecords")) || [];

// Function to render table
function renderTable() {
  tableBody.innerHTML = "";
  records.forEach((record) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${record.equipment}</td>
        <td>${record.serial}</td>
        <td>${record.lastMaintenanceDate}</td>
        <td>${record.issueReported}</td>
        <td>${record.repairDone}</td>
        <td>${record.nextDueDate}</td>
        <td>${record.technician}</td>
        <td>${record.notes}</td>
      `;
    tableBody.appendChild(row);
  });
}

// Initial render
renderTable();

// Handle form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const record = {
    equipment: document.getElementById("equipment").value,
    serial: document.getElementById("serial").value,
    lastMaintenanceDate: document.getElementById("lastDate").value,
    issueReported: document.getElementById("issue").value,
    repairDone: document.getElementById("repair").value,
    nextDueDate: document.getElementById("nextDate").value,
    technician: document.getElementById("technician").value,
    notes: document.getElementById("notes").value,
  };

  records.push(record);
  localStorage.setItem("maintenanceRecords", JSON.stringify(records));

  renderTable();
  form.reset();
});

// Download JSON file
downloadBtn.addEventListener("click", function () {
  const blob = new Blob([JSON.stringify(records, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "maintenance_records.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

// Download CSV file
downloadCsvBtn.addEventListener("click", function () {
  if (records.length === 0) return;

  const headers = Object.keys(records[0]).join(",");
  const rows = records.map((record) => {
    return Object.values(record)
      .map((value) => `"${value}"`)
      .join(",");
  });
  const csvContent = [headers, ...rows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "maintenance_records.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});
