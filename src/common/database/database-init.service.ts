import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { PG_CONNECTION } from "./database.module";

@Injectable()
export class DatabaseInitService implements OnModuleInit {
    constructor(@Inject(PG_CONNECTION) private conn: any) {}

    onModuleInit(): any {
        const query = `
            CREATE TABLE IF NOT EXISTS "users"
            (
                "id"         SERIAL,
                "createdAt"  timestamp DEFAULT CURRENT_TIMESTAMP,
                "username"   VARCHAR(255) NOT NULL,
                "first_name" VARCHAR(255) NOT NULL,
                "last_name"  VARCHAR(255) NOT NULL,
                PRIMARY KEY ("id")
            );
            DROP TABLE IF EXISTS cars;
            CREATE TABLE cars
            (
                "id"                 SERIAL,
                "userId"             INT          NOT NULL,
                "createdAt"          timestamp DEFAULT CURRENT_TIMESTAMP,
                "title"              VARCHAR(255) NOT NULL,
                "brand"              VARCHAR(255) NOT NULL,
                "model"              VARCHAR(255) NOT NULL,
                "governmentNumber"   VARCHAR(255) NOT NULL,
                "fuelCapability"     INT          NOT NULL,
                "remainingFuel"      INT,
                "maintenanceEvery"   INT          NOT NULL,
                "lastCarMaintenance" INT          NOT NULL,
                "coordinates"        JSONB,
                PRIMARY KEY ("id"),
                FOREIGN KEY ("userId") REFERENCES users (id)
            );
        `;
        this.conn.query(query);
    }
}
