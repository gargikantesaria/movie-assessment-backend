import { AllowedSchema } from "express-json-validator-middleware";

export const loginSchema: AllowedSchema = {
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
}