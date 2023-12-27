import { Router } from "express";
import { Validator } from "express-json-validator-middleware";
import { MovieController } from "../controllers/movies/moviesController";
import { AuthMiddleware } from "../controllers/auth/authMiddleware";
import { createMovieSchema } from "../schema/movieSchemas";

// Assign router to the express.Router() instance
const router: Router = Router();
const { validate } = new Validator({ schemas: [createMovieSchema] });
const movieController = new MovieController();
const authMiddleware = new AuthMiddleware();

router.post("/", validate({ body: createMovieSchema }), authMiddleware.validateAndGetDataFromJWT, movieController.createMovie);
router.put("/:movie_uuid", validate({ body: createMovieSchema }), authMiddleware.validateAndGetDataFromJWT, movieController.updateMovie);
router.get("/:movie_uuid", authMiddleware.validateAndGetDataFromJWT, movieController.getMovieDetailsById);
router.get("/", authMiddleware.validateAndGetDataFromJWT, movieController.getMovieList);

export const MovieRoute: Router = router;