import { Request, Response, NextFunction } from "express";
import TokenPayload from "../auth/tokenPayload";
import { MovieService } from "../../services/movieService";
import { Constants } from "../../config/constants";
import { ResponseMessages } from "../../config/response_messages";

export interface moiveInputRequestWithFile extends Request {
    files: { poster_image: File }
}

export class MovieController {

    // create movie
    public createMovie = async (req: moiveInputRequestWithFile, res: Response, next: NextFunction) => {
        try {
            const tokenPayload: TokenPayload = req.body.__Jwt;
            const movieService = new MovieService(tokenPayload);

            const movie = req.body;
            const poster_image = req.files.poster_image ? req.files.poster_image : null;

            const createdMovie = await movieService.createMovie(movie, tokenPayload, poster_image);
            return res.status(Constants.RESPONSE_STATUS_CODE.CREATED_SUCCESS_CODE).json({
                message: ResponseMessages.movies.MOVIE_CREATED_SUCCESSFULLY
            });
        } catch (error) {
            next(error);
        }
    }

    // update movie 
    public updateMovie = async (req: moiveInputRequestWithFile, res: Response, next: NextFunction) => {
        try {
            const tokenPayload: TokenPayload = req.body.__Jwt;
            const movieService = new MovieService(tokenPayload);

            const movie = req.body;
            movie.movie_uuid = req.params.movie_uuid;
            const poster_image = req.files.poster_image ? req.files.poster_image : null;

            const updatedMovie = await movieService.updateMovie(movie, tokenPayload, poster_image);
            return res.status(Constants.RESPONSE_STATUS_CODE.CREATED_SUCCESS_CODE).json({
                message: ResponseMessages.movies.MOVIE_UPDATED_SUCCESSFULLY
            });
        } catch (error) {
            next(error);
        }
    }

    // get movie details by ID
    public getMovieDetailsById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tokenPayload: TokenPayload = req.body.__Jwt;
            const movieService = new MovieService(tokenPayload);

            const movie_uuid = req.params.movie_uuid;
            const getDetails = await movieService.getMovieDetailsById(movie_uuid);

            return res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json(getDetails);
        } catch (error) {
            next(error);
        }
    }

    // get movie list
    public getMovieList = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tokenPayload: TokenPayload = req.body.__Jwt;
            const movieService = new MovieService(tokenPayload);

            const getList = await movieService.getMovieList();
            return res.status(Constants.RESPONSE_STATUS_CODE.SUCCESS_CODE).json(getList);
        } catch (error) {
            next(error);
        }
    }
}