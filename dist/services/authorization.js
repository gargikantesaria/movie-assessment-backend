"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokenPayload_1 = __importDefault(require("../controllers/auth/tokenPayload"));
class Authorization {
    constructor(tokenInfo) {
        this.userShouldBe = (user_uuid) => {
            return this.tokenInfo.user_uuid === user_uuid;
        };
        if (!tokenInfo) {
            this.tokenInfo = new tokenPayload_1.default("");
        }
        else {
            this.tokenInfo = tokenInfo;
        }
    }
}
exports.default = Authorization;
//# sourceMappingURL=authorization.js.map