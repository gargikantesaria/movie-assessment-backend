import BaseService from "./baseService";
import * as Errors from "../errors";
import { Aws } from "../helpers/aws";
import MovieRepository from "../repositories/moviesRepository";
import { getCustomRepository } from "typeorm";
import TokenPayload from "../controllers/auth/tokenPayload";
import { Movie } from "../entity/movies";
import { ResponseMessages } from "../config/response_messages";
import { Constants } from "../config/constants";

export class MovieService extends BaseService {
    private movieRepository: MovieRepository;
    private aws = new Aws();

    constructor(tokenInfo: TokenPayload) {
        super(tokenInfo);
        this.movieRepository = getCustomRepository(MovieRepository);
    }

    // create movie
    public createMovie = async (movie: Movie, tokenInfo: TokenPayload, poster_image?: File) => {
        // check book already exists by title
        if (await this.movieRepository.checkMovieExistByTitle(movie.movie_title)) {
            throw new Errors.ConflictError(ResponseMessages.movies.MOVIE_ALREADY_EXISTS);
        }

        movie.created_by = tokenInfo.user_uuid;
        const createdMovie = await this.movieRepository.saveMovie(movie);

        // upload poster image & store s3 url
        if (createdMovie && poster_image && poster_image !== null) {
            const storeToFolder = `${Constants.S3_PATHS.MOVIE_POSTER_IMAGE_S3_PATH.replace(/{movie_uuid}/, createdMovie.movie_uuid)}`;
            const uploadFile = await this.aws.uploadImage(poster_image, storeToFolder, poster_image.name);
            if (uploadFile) {
                createdMovie.poster_image_url = uploadFile.key;
                await this.movieRepository.saveMovie(createdMovie);
            }
        }

        return createdMovie;
    }

    // update movie
    public updateMovie = async (movie: Movie, tokenInfo: TokenPayload, poster_image?: File) => {
        const getMovie = await this.movieRepository.getMovieById(movie.movie_uuid);

        // check movie exists
        if (!getMovie) {
            throw new Errors.NotFoundError(ResponseMessages.movies.MOVIE_NOT_FOUND);
        }

        // check movie title already exists
        if (await this.movieRepository.checkMovieExistByTitleAndId(movie.movie_uuid, movie.movie_title)) {
            throw new Errors.ConflictError(ResponseMessages.movies.MOVIE_ALREADY_EXISTS);
        }

        // upload movie poster
        if (poster_image && poster_image !== null) {
            // delete already exist poster image
            if (getMovie.poster_image_url && getMovie.poster_image_url !== null) {
                const deletedProfileImageFromS3 = await this.aws.deleteImage(decodeURIComponent(getMovie.poster_image_url));
            }

            const storeToFolder = `${Constants.S3_PATHS.MOVIE_POSTER_IMAGE_S3_PATH.replace(/{movie_uuid}/, movie.movie_uuid)}`;
            const uploadFile = await this.aws.uploadImage(poster_image, storeToFolder, poster_image.name);
            if (uploadFile) {
                movie.poster_image_url = uploadFile.key;
            }
        }

        movie.updated_by = tokenInfo.user_uuid;
        const movieUpdated = await this.movieRepository.saveMovie(movie);

        return movieUpdated;
    }

    // get movie details by id
    public getMovieDetailsById = async (movie_uuid: string) => {
        const getMovie = await this.movieRepository.getMovieById(movie_uuid);

        // check movie exists
        if (!getMovie) {
            throw new Errors.NotFoundError(ResponseMessages.movies.MOVIE_NOT_FOUND);
        }

        return getMovie;
    }

    // list movies
    public getMovieList = async () => {
        return await this.movieRepository.getMovieList();
    }
}