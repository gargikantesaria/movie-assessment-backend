"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMovieSchema = void 0;
exports.createMovieSchema = {
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
};
//# sourceMappingURL=movieSchemas.js.map