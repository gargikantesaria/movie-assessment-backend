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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet")); // Security
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("cors"));
const timeout = __importStar(require("express-timeout-handler"));
require("reflect-metadata");
const response_messages_1 = require("./config/response_messages");
const errorLogHandler_1 = __importDefault(require("./errors/handlers/errorLogHandler"));
const errorHandler_1 = __importDefault(require("./errors/handlers/errorHandler"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
dotenv.config();
class App {
    constructor() {
        this.options = {
            timeout: 10000000,
            onTimeout(req, res) {
                res.status(408).send({ error: response_messages_1.ResponseMessages.common.ERR_SERVER_TIMEOUT, status: 'Error' });
            },
            disable: ['write', 'setHeaders', 'send', 'json', 'end'],
        };
        this.app = (0, express_1.default)();
        this.app.use((0, cors_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.all("/*", (req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Request-Headers", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, Authorization, token, x-device-type, x-app-version, x-build-number, uuid, x-auth-token, x-l10n-locale");
            res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
            if (req.method === "OPTIONS") {
                res.writeHead(200);
                res.end();
            }
            else {
                next();
            }
        });
        this.app.use((0, express_fileupload_1.default)({
            parseNested: true,
            useTempFiles: true,
            tempFileDir: '/tmp/',
        }));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        const routes = new routes_1.Routes();
        this.app.use(timeout.handler(this.options));
        // If route match
        this.app.use("/v1", routes.path());
        // Error handling as last middlewares
        this.app.use(errorLogHandler_1.default);
        this.app.use(errorHandler_1.default);
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map