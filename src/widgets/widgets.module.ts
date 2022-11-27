import { Module } from "@nestjs/common";
import { WidgetsController } from "./widgets.controller";
import { CarModule } from "../modules/car/car.module";

@Module({
    controllers: [WidgetsController],
    imports: [CarModule]
})
export class WidgetsModule {}
