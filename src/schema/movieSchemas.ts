import { AllowedSchema } from "express-json-validator-middleware";

export const createMovieSchema: AllowedSchema = {
    $id: "http://movieAssessment/schemas/createMovie.json",
    type: "object",
    required: ["movie_title", "movie_published_year"],
    properties: {
        movie_title: {
            type: "string",
        },
        movie_published_year: {
            type: "string",
        }
    },
    additionalProperties: false
}