import { Constants } from "../config/constants";
import { createLogger, format, transports } from "winston";
import dayjs from "dayjs";
const { combine, timestamp, prettyPrint, colorize } = format;

export class Log {
  public static getLogger() {
    const timestampFormat: string = dayjs().format(
      Constants.TIME_STAMP_FORMAT
    );
    // return pino({
    //   transport: {
    //     target: 'pino-pretty',
    //     options: {
    //       colorize: true,
    //       translateTime: timestampFormat
    //     }
    //   },
    //   level:"debug",
    // })
    return createLogger({
      format: combine(
        timestamp({ format: timestampFormat }),
        prettyPrint(),
        colorize()
      ),
      level: "debug",
      transports: [new transports.Console()],
    });
  }
}
