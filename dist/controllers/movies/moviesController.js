"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieController = void 0;
const movieService_1 = require("../../services/movieService");
const constants_1 = require("../../config/constants");
const response_messages_1 = require("../../config/response_messages");
class MovieController {
    constructor() {
        // create movie
        this.createMovie = async (req, res, next) => {
            try {
                const tokenPayload = req.body.__Jwt;
                const movieService = new movieService_1.MovieService(tokenPayload);
                const movie = req.body;
                const poster_image = req.files.poster_image ? req.files.poster_image : null;
                const createdMovie = await movieService.createMovie(movie, tokenPayload, poster_image);
                return res.status(constants_1.Constants.RESPONSE_STATUS_CODE.CREATED_SUCCESS_CODE).json({
                    message: response_messages_1.ResponseMessages.movies.MOVIE_CREATED_SUCCESSFULLY
                });
            }
            catch (error) {
                next(error);
            }
        };
        // update movie 
        this.updateMovie = async (req, res, next) => {
            try {
                const tokenPayload = req.body.__Jwt;
                const movieService = new movieService_1.MovieService(tokenPayload);
                const movie = req.body;
                movie.movie_uuid = req.params.movie_uuid;
                const poster_image = req.files.poster_image ? req.files.poster_image : null;
                const updatedMovie = await movieService.updateMovie(movie, tokenPayload, poster_image);
                return res.status(constants_1.Constants.RESPONSE_STATUS_CODE.CREATED_SUCCESS_CODE).json({
                    message: response_messages_1.ResponseMessages.movies.MOVIE_UPDATED_SUCCESSFULLY
                });
            }
            catch (error) {
                next(error);
            }
        };
        // get movie details by ID
        this.getMovieDetailsById = async (req, res, next) => {
            try {
                const tokenPayload = req.body.__Jwt;
                const movieService = new movieService_1.MovieService(tokenPayload);
                const movie_uuid = req.params.movie_uuid;
                const getDetails = await movieService.getMovieDetailsById(movie_uuid);
                return res.status(constants_1.Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json(getDetails);
            }
            catch (error) {
                next(error);
            }
        };
        // get movie list
        this.getMovieList = async (req, res, next) => {
            try {
                const tokenPayload = req.body.__Jwt;
                const movieService = new movieService_1.MovieService(tokenPayload);
                const getList = await movieService.getMovieList();
                return res.status(constants_1.Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json(getList);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.MovieController = MovieController;
//# sourceMappingURL=moviesController.js.map