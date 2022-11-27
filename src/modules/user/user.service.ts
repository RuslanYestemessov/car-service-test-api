import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import { PG_CONNECTION } from "../../database/database.module";

@Injectable()
export class UserService implements OnModuleInit {
    constructor(@Inject(PG_CONNECTION) private conn: any) {}

    async create(createUserDto: CreateUserDto) {
        await this.conn.query(
            `INSERT INTO "users" (username, first_name, last_name)
             VALUES ($1, $2, $3)`,
            [
                createUserDto.username,
                createUserDto.firstName,
                createUserDto.lastName
            ]
        );
    }

    async findAll(): Promise<UserEntity[]> {
        const users = await this.conn.query('SELECT * FROM users');
        return users.rows;
    }

    async findOne(id: number): Promise<UserEntity> {
        const user = await this.conn.query(`SELECT *
                                            FROM users
                                            WHERE id = ${ id }`);
        return user.rows[0];
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        await this.conn.query(`UPDATE users
                               SET "username"= $1,
                                   first_name= $2,
                                   last_name= $3
                               WHERE id = ${ id }`,
            [
                updateUserDto.username,
                updateUserDto.firstName,
                updateUserDto.lastName
            ]);
        return;
    }

    async remove(id: number) {
        await this.conn.query(`DELETE
                               FROM users
                               WHERE id = ${ id }`);
        return;
    }

    onModuleInit(): void {
        const query = `
            CREATE TABLE IF NOT EXISTS "users"
            (
                "id"         SERIAL,
                "createdAt"  timestamp DEFAULT CURRENT_TIMESTAMP,
                "username"   VARCHAR(255) NOT NULL,
                "first_name" VARCHAR(255) NOT NULL,
                "last_name"  VARCHAR(255) NOT NULL,
                PRIMARY KEY ("id")
            );`;
        this.conn.query(query);
    }
}
