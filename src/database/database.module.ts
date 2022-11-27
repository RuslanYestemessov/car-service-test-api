import { Module, Provider } from "@nestjs/common";
import { Pool } from "pg";
import { ConfigModule, ConfigService } from "@nestjs/config";

export const PG_CONNECTION = 'PG_CONNECTION';

const dbProvider: Provider = {
    provide: PG_CONNECTION,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) =>
        new Pool({
            user: configService.get('DB_USER'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_TITLE'),
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT')
        })
};

@Module({
    providers: [dbProvider],
    imports: [ConfigModule],
    exports: [dbProvider]
})
export class DatabaseModule {
}
