import { Config } from "./Config";
import { createLogger, format, transports } from "winston";

const config = new Config();

const loggerTransports: any[] = [
  new transports.File({
    level: "info",
    filename: `logs.log`,
  }),
];

const loggerRequestTransports = [
  new transports.File({
    level: "warn",
    filename: `requestWarnings.log`,
  }),
  new transports.File({
    level: "error",
    filename: `requestErrors.log`,
  }),
];

if (config.env.env !== "prod") {
  loggerTransports.push(new transports.Console());

  loggerRequestTransports.push(
    new transports.File({
      level: "info",
      filename: `requestInfo.log`,
    })
  );
}

export const logger = createLogger({
  transports: loggerTransports,
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.prettyPrint(),
    format.colorize()
  ),
});

export const requestLogger = createLogger({
  transports: loggerRequestTransports,
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.prettyPrint(),
    format.colorize()
  ),
});
