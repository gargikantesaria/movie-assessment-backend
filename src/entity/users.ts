import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Tables } from "../config/tables";

@Entity({ name: Tables.USERS })
export class User {

    @PrimaryGeneratedColumn("uuid")
    user_uuid: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'char' })
    created_by: string;

    @Column({ type: 'char' })
    updated_by: string;

    @Column({ type: 'datetime' })
    created_at: string;

    @Column({ type: 'datetime' })
    updated_at: string;
}