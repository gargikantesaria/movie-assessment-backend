import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Tables } from "../config/tables";

@Entity({ name: Tables.MOVIES })
export class Movie {

    @PrimaryGeneratedColumn("uuid")
    movie_uuid: string;

    @Column({ type: 'varchar' })
    movie_title: string;

    @Column({ type: 'int' })
    movie_published_year: number;

    @Column({ type: 'text' })
    poster_image_url: string;

    @Column({ type: 'char' })
    created_by: string;

    @Column({ type: 'char' })
    updated_by: string;

    @Column({ type: 'datetime' })
    created_at: string;

    @Column({ type: 'datetime' })
    updated_at: string;
}