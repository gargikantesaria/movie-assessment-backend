"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const typeorm_1 = require("typeorm");
const app_1 = require("./app");
const logger_1 = require("./helpers/logger");
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
// create logger
const logger = logger_1.Log.getLogger();
const expr = new app_1.App();
// connect to database
(0, typeorm_1.createConnection)().then(connection => {
    expr.app.listen(PORT, () => {
        logger.info(`The server is running in port localhost: ${PORT} &&
          The connection established: ${connection.isConnected.toString()}`);
    });
}).catch(err => {
    if (err instanceof Error) {
        logger.error(`orm database connection error: ${err.message}`);
    }
    else {
        logger.error('orm database connection error');
    }
});
//# sourceMappingURL=index.js.map