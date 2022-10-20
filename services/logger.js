require("dotenv").config();
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize, metadata, errors, json } = format;

class Logger {
  constructor(name) {
    this.name = name;
    this.logger = createLogger({
      level: "info",
      defaultMeta: { service: name },
      transports: [
        new transports.Console({
          format: combine(
            timestamp(),
            metadata({
              fillExcept: ["timestamp", "service", "level", "message"],
            }),
            colorize(),
            this.winstonConsoleFormat()
          ),
        }),
        new transports.File({
          filename: "./logs/" + name + ".log",
          format: combine(
            timestamp(),
            metadata({
              fillExcept: ["timestamp", "service", "level", "message"],
            }),
            errors({ stack: true }),
            json(),
            this.winstonConsoleFormat()
          ),
        }),
      ],
    });
  }
  winstonConsoleFormat() {
    return printf(({ timestamp, level, message, metadata }) => {
      const metadataString = metadata != null ? JSON.stringify(metadata) : "";
      return `[${timestamp}][${level}][${this.name}] ${message} ${metadataString}`;
    });
  }

  debug(log, metadata) {
    this.logger.debug(log, metadata);
  }

  info(log, metadata) {
    this.logger.info(log, metadata);
  }

  warn(log, metadata) {
    this.logger.warn(log, metadata);
  }

  error(log, metadata) {
    this.logger.error(log, metadata);
  }

  log(level, log, metadata) {
    const metadataObject = {};
    if (metadata) metadataObject.metadata = metadata;

    this.logger[level](log, metadataObject);
  }
}
exports.logger = new Logger(process.env.APP_NAME);

exports.getLogger = (name) => {
  return new Logger(name);
};
