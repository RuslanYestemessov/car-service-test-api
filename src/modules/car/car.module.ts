import { Module } from "@nestjs/common";
import { CarController } from "./car.controller";
import { CarService } from "./services/car.service";
import { UserModule } from "../user/user.module";
import { DatabaseModule } from '../../common/database/database.module';
import { CarUpdatesWebsocketService } from './services/car-updates.websocket.service';

@Module({
    imports: [
        UserModule,
        DatabaseModule
    ],
    controllers: [CarController],
    providers: [
        CarService,
        CarUpdatesWebsocketService
    ],
    exports: [CarService]
})
export class CarModule {}
