const { getDb } = require("../configurations/database");

exports.Audit = class Audit {
  constructor(auditAction, data, status, error, auditBy, audinOn) {
    this.auditAction = auditAction;
    this.data = data;
    this.status = status;
    this.error = error;
    this.auditBy = auditBy;
    this.audinOn = audinOn;
  }
  save() {
    getDb().collection("audit").insertOne(this);
  }
};
