const form = document.getElementById("maintenanceForm");
const tableBody = document.getElementById("recordsTable");

const reportsModel = new ReportsModel();
const reportsController = new ReportsController();
const formView = new FormView([reportsModel], [reportsController]);
formView.renderTable();
reportsController.initialize({ model: reportsModel, view: formView });
