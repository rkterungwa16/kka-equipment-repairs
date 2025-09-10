class FormView {
  constructor(models, controllers) {
    let self = this;
    const form = document.getElementById("maintenanceForm");
    const downloadBtn = document.getElementById("downloadJson");
    const downloadCsvBtn = document.getElementById("downloadCsv");
    this.renderTable = this.renderTable.bind(this);
    self.controllers = controllers;
    self.models = models;
    let reports =
      localStorage.getItem("maintenanceRecords") &&
      localStorage.getItem("maintenanceRecords") !== "undefined"
        ? JSON.parse(localStorage.getItem("maintenanceRecords"))
        : [];
    const reportsModel = this.models.find(
      (_model) => _model.name === "reports"
    );
    reportsModel.reports = reports;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      self.save();
      console.log("THIS___", this);
      self.renderTable();
      form.reset();
    });

    // Download JSON file
    downloadBtn.addEventListener("click", function () {
      const reportsModel = self.models.find(
        (_model) => _model.name === "reports"
      );
      const blob = new Blob([JSON.stringify(reportsModel.reports, null, 2)], {
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
  }

  renderTable() {
    const tableBody = document.getElementById("recordsTable");
    const reportsModel = this.models.find(
      (_model) => _model.name === "reports"
    );

    tableBody.innerHTML = "";
    reportsModel.reports.forEach((record) => {
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

  clear() {}

  save() {
    const equipment = document.getElementById("equipment").value;
    const lastMaintenanceDate = document.getElementById("lastDate").value;
    const issueReported = document.getElementById("issue").value;
    const repairDone = document.getElementById("repair").value;
    const nextDueDate = document.getElementById("nextDate").value;
    const technician = document.getElementById("technician").value;
    const notes = document.getElementById("notes").value;

    const data = {
      equipment,
      lastMaintenanceDate,
      issueReported,
      repairDone,
      nextDueDate,
      technician,
      notes,
    };
    console.log("DATA--", data);
    const reportsController = this.controllers.find(
      (_controller) => _controller.name === "reports"
    );
    reportsController.save(data);
    const reportsModel = this.models.find(
      (_model) => _model.name === "reports"
    );
    localStorage.setItem(
      "maintenanceRecords",
      JSON.stringify(reportsModel.reports)
    );
  }
}
