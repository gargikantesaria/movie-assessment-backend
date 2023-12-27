import { AbstractRepository, EntityRepository, Not } from "typeorm";
import { Movie } from "../entity/movies";
import { Log } from "../helpers/logger";
import { Aws } from "../helpers/aws";
import { ResponseMessages } from "../config/response_messages";

@EntityRepository(Movie)
class MovieRepository extends AbstractRepository<Movie> {

    private logger = Log.getLogger();
    private aws = new Aws();

    public saveMovie = async (movie: Movie) => {
        const savedMovie: Movie = await this.repository.save(movie);
        return savedMovie;
    }

    public checkMovieExistByTitle = async (movie_title: string) => {
        const exists = await this.repository.findOne({ where: { movie_title: movie_title } });
        return !(exists == null);
    }

    public getMovieById = async (movie_uuid: string) => {
        return await this.repository.findOne({ where: { movie_uuid: movie_uuid } });
    }

    public checkMovieExistByTitleAndId = async (movie_uuid: string, movie_title: string) => {
        return await this.repository.findOne({ where: { movie_uuid: Not(movie_uuid), movie_title: movie_title } });
    }

    public getMovieList = async () => {
        return await this.repository.find({ order: { created_at: "DESC" } });
    }
}

export default MovieRepository;