"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
exports.loginSchema = {
    $id: "http://movieAssessment/schemas/login.json",
    type: "object",
    required: ["email", "password"],
    properties: {
        email: {
            type: "string",
            maxLength: 100
        },
        password: {
            type: "string",
            maxLength: 100
        }
    },
    additionalProperties: false
};
//# sourceMappingURL=authSchemas.js.map