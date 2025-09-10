class ReportsController {
  constructor() {
    this.name = "reports";
    this.model = null;
    this.view = null;
  }
  initialize({ model, view }) {
    this.model = model;
    this.view = view;
  }

  save(data) {
    this.model.reports.push(data);
  }
}
