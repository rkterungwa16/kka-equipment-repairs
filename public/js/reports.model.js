class ReportModel {
  constructor({
    equipment,
    lastMaintainceDate,
    issueReported,
    repairPerformed,
    nextDueDate,
    technician,
    notes,
  }) {
    this.equipment = equipment;
    this.serialId = serialId;
    this.lastMaintainceDate = lastMaintainceDate;
    this.issueReported = issueReported;
    this.repairPerformed = repairPerformed;
    this.nextDueDate = nextDueDate;
    this.technician = technician;
    this.notes = notes;
  }
}

class ReportsModel {
  constructor() {
    this.name = "reports";
    this.reports = [];
  }
  set(data) {
    this.reports = data;
  }
}
