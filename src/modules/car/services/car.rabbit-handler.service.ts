import { Injectable } from "@nestjs/common";
import { CarService } from "./car.service";
import { RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { CarInfoUpdateDto } from "../dto/car-info-update.dto";
import { CarUpdatesWebsocketService } from './car-updates.websocket.service';

@Injectable()
export class CarRabbitHandlerService {
    constructor(
        private readonly carService: CarService,
        private readonly websocketService: CarUpdatesWebsocketService
    ) {}

    @RabbitSubscribe({
        exchange: '',
        routingKey: '',
        queue: 'carInfoUpdate'
    })
    private async handleCarInfoUpdate(message: CarInfoUpdateDto) {
        await this.carService.infoUpdate(message);
        this.websocketService.sendMessage(message);
    }
}
