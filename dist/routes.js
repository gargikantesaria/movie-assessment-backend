"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const express_1 = __importDefault(require("express"));
const notFoundError_1 = __importDefault(require("./errors/notFoundError"));
const authRoutes_1 = require("./routes/authRoutes");
const movieRoutes_1 = require("./routes/movieRoutes");
class Routes {
    // Diff Routes to Load
    path() {
        const router = express_1.default.Router();
        router.use("/auth", authRoutes_1.AuthRoute);
        router.use("/movie", movieRoutes_1.MovieRoute);
        // For all other irrelevent routes
        router.all("/*", (req, res) => {
            throw new notFoundError_1.default();
        });
        return router;
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map