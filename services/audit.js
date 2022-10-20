const events = require("events");
const { Audit } = require("../models/audit");
const { getDb, dbConnection } = require("../configurations/database");
const { logger } = require("./logger");

const emitter = new events.EventEmitter();
const auditEvent = "audit";

emitter.on(auditEvent, (obj) => {
  logger.info("Audit Event Emitter - Audit", JSON.stringify(obj));

  try {
    new Audit(
      obj.auditAction,
      obj.data,
      obj.status,
      obj.error,
      obj.auditBy,
      obj.auditOn
    ).save();
  } catch (error) {
    logger.error("Audit Event Emitter - error: " + error.message);
  }
});

const audit = (auditAction, data, error, auditBy, auditOn) => {
  let status = 200;
  if (error) status = 500;
  const auditObj = new Audit(
    auditAction,
    data,
    status,
    error,
    auditBy,
    auditOn
  );
  emitter.emit(auditEvent, auditObj);
};

exports.audit = audit;
