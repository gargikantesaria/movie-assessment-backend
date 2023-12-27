"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const movies_1 = require("../entity/movies");
const logger_1 = require("../helpers/logger");
const aws_1 = require("../helpers/aws");
let MovieRepository = class MovieRepository extends typeorm_1.AbstractRepository {
    constructor() {
        super(...arguments);
        this.logger = logger_1.Log.getLogger();
        this.aws = new aws_1.Aws();
        this.saveMovie = async (movie) => {
            const savedMovie = await this.repository.save(movie);
            return savedMovie;
        };
        this.checkMovieExistByTitle = async (movie_title) => {
            const exists = await this.repository.findOne({ where: { movie_title: movie_title } });
            return !(exists == null);
        };
        this.getMovieById = async (movie_uuid) => {
            return await this.repository.findOne({ where: { movie_uuid: movie_uuid } });
        };
        this.checkMovieExistByTitleAndId = async (movie_uuid, movie_title) => {
            return await this.repository.findOne({ where: { movie_uuid: (0, typeorm_1.Not)(movie_uuid), movie_title: movie_title } });
        };
        this.getMovieList = async () => {
            return await this.repository.find({ order: { created_at: "DESC" } });
        };
    }
};
MovieRepository = __decorate([
    (0, typeorm_1.EntityRepository)(movies_1.Movie)
], MovieRepository);
exports.default = MovieRepository;
//# sourceMappingURL=moviesRepository.js.map