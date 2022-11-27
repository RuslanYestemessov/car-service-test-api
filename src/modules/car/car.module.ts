import { Module } from "@nestjs/common";
import { CarController } from "./car.controller";
import { CarService } from "./car.service";
import { UserModule } from "../user/user.module";
import { DatabaseModule } from '../../database/database.module';

@Module({
    imports: [
        UserModule,
        DatabaseModule
    ],
    controllers: [CarController],
    providers: [CarService]
})
export class CarModule {}
