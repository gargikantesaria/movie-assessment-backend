"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieRoute = void 0;
const express_1 = require("express");
const express_json_validator_middleware_1 = require("express-json-validator-middleware");
const moviesController_1 = require("../controllers/movies/moviesController");
const authMiddleware_1 = require("../controllers/auth/authMiddleware");
const movieSchemas_1 = require("../schema/movieSchemas");
// Assign router to the express.Router() instance
const router = (0, express_1.Router)();
const { validate } = new express_json_validator_middleware_1.Validator({ schemas: [movieSchemas_1.createMovieSchema] });
const movieController = new moviesController_1.MovieController();
const authMiddleware = new authMiddleware_1.AuthMiddleware();
router.post("/", validate({ body: movieSchemas_1.createMovieSchema }), authMiddleware.validateAndGetDataFromJWT, movieController.createMovie);
router.put("/:movie_uuid", validate({ body: movieSchemas_1.createMovieSchema }), authMiddleware.validateAndGetDataFromJWT, movieController.updateMovie);
router.get("/:movie_uuid", authMiddleware.validateAndGetDataFromJWT, movieController.getMovieDetailsById);
router.get("/", authMiddleware.validateAndGetDataFromJWT, movieController.getMovieList);
exports.MovieRoute = router;
//# sourceMappingURL=movieRoutes.js.map