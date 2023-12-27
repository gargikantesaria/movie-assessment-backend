import express from "express";
import NotFoundError from "./errors/notFoundError";
import { AuthRoute } from "./routes/authRoutes";
import { MovieRoute } from "./routes/movieRoutes";

export class Routes {

    // Diff Routes to Load
    public path() {
        const router = express.Router();

        router.use("/auth", AuthRoute);
        router.use("/movie", MovieRoute);

        // For all other irrelevent routes
        router.all("/*", (req, res) => {
            throw new NotFoundError();
        });

        return router;
    }
}