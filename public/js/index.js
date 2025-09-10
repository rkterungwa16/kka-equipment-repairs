const form = document.getElementById("maintenanceForm");
const tableBody = document.getElementById("recordsTable");
const downloadBtn = document.getElementById("downloadJson");
const downloadCsvBtn = document.getElementById("downloadCsv");


// Download JSON file
// downloadBtn.addEventListener("click", function () {
//   const blob = new Blob([JSON.stringify(records, null, 2)], {
//     type: "application/json",
//   });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "maintenance_records.json";
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url);
// });

// Download CSV file
// downloadCsvBtn.addEventListener("click", function () {
//   if (records.length === 0) return;

//   const headers = Object.keys(records[0]).join(",");
//   const rows = records.map((record) => {
//     return Object.values(record)
//       .map((value) => `"${value}"`)
//       .join(",");
//   });
//   const csvContent = [headers, ...rows].join("\n");

//   const blob = new Blob([csvContent], { type: "text/csv" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "maintenance_records.csv";
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   URL.revokeObjectURL(url);
// });

const reportsModel = new ReportsModel();
const reportsController = new ReportsController();
const formView = new FormView([reportsModel], [reportsController]);
formView.renderTable();
reportsController.initialize({ model: reportsModel, view: formView});
