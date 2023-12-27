"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const constants_1 = require("../config/constants");
const winston_1 = require("winston");
const dayjs_1 = __importDefault(require("dayjs"));
const { combine, timestamp, prettyPrint, colorize } = winston_1.format;
class Log {
    static getLogger() {
        const timestampFormat = (0, dayjs_1.default)().format(constants_1.Constants.TIME_STAMP_FORMAT);
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
        return (0, winston_1.createLogger)({
            format: combine(timestamp({ format: timestampFormat }), prettyPrint(), colorize()),
            level: "debug",
            transports: [new winston_1.transports.Console()],
        });
    }
}
exports.Log = Log;
//# sourceMappingURL=logger.js.map