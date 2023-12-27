"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieService = void 0;
const baseService_1 = __importDefault(require("./baseService"));
const Errors = __importStar(require("../errors"));
const aws_1 = require("../helpers/aws");
const moviesRepository_1 = __importDefault(require("../repositories/moviesRepository"));
const typeorm_1 = require("typeorm");
const response_messages_1 = require("../config/response_messages");
const constants_1 = require("../config/constants");
class MovieService extends baseService_1.default {
    constructor(tokenInfo) {
        super(tokenInfo);
        this.aws = new aws_1.Aws();
        // create movie
        this.createMovie = async (movie, tokenInfo, poster_image) => {
            // check book already exists by title
            if (await this.movieRepository.checkMovieExistByTitle(movie.movie_title)) {
                throw new Errors.ConflictError(response_messages_1.ResponseMessages.movies.MOVIE_ALREADY_EXISTS);
            }
            movie.created_by = tokenInfo.user_uuid;
            const createdMovie = await this.movieRepository.saveMovie(movie);
            // upload poster image & store s3 url
            if (createdMovie && poster_image && poster_image !== null) {
                const storeToFolder = `${constants_1.Constants.S3_PATHS.MOVIE_POSTER_IMAGE_S3_PATH.replace(/{movie_uuid}/, createdMovie.movie_uuid)}`;
                const uploadFile = await this.aws.uploadImage(poster_image, storeToFolder, poster_image.name);
                if (uploadFile) {
                    createdMovie.poster_image_url = uploadFile.key;
                    await this.movieRepository.saveMovie(createdMovie);
                }
            }
            return createdMovie;
        };
        // update movie
        this.updateMovie = async (movie, tokenInfo, poster_image) => {
            const getMovie = await this.movieRepository.getMovieById(movie.movie_uuid);
            // check movie exists
            if (!getMovie) {
                throw new Errors.NotFoundError(response_messages_1.ResponseMessages.movies.MOVIE_NOT_FOUND);
            }
            // check movie title already exists
            if (await this.movieRepository.checkMovieExistByTitleAndId(movie.movie_uuid, movie.movie_title)) {
                throw new Errors.ConflictError(response_messages_1.ResponseMessages.movies.MOVIE_ALREADY_EXISTS);
            }
            // upload movie poster
            if (poster_image && poster_image !== null) {
                // delete already exist poster image
                if (getMovie.poster_image_url && getMovie.poster_image_url !== null) {
                    const deletedProfileImageFromS3 = await this.aws.deleteImage(decodeURIComponent(getMovie.poster_image_url));
                }
                const storeToFolder = `${constants_1.Constants.S3_PATHS.MOVIE_POSTER_IMAGE_S3_PATH.replace(/{movie_uuid}/, movie.movie_uuid)}`;
                const uploadFile = await this.aws.uploadImage(poster_image, storeToFolder, poster_image.name);
                if (uploadFile) {
                    movie.poster_image_url = uploadFile.key;
                }
            }
            movie.updated_by = tokenInfo.user_uuid;
            const movieUpdated = await this.movieRepository.saveMovie(movie);
            return movieUpdated;
        };
        // get movie details by id
        this.getMovieDetailsById = async (movie_uuid) => {
            const getMovie = await this.movieRepository.getMovieById(movie_uuid);
            // check movie exists
            if (!getMovie) {
                throw new Errors.NotFoundError(response_messages_1.ResponseMessages.movies.MOVIE_NOT_FOUND);
            }
            return getMovie;
        };
        // list movies
        this.getMovieList = async () => {
            return await this.movieRepository.getMovieList();
        };
        this.movieRepository = (0, typeorm_1.getCustomRepository)(moviesRepository_1.default);
    }
}
exports.MovieService = MovieService;
//# sourceMappingURL=movieService.js.map