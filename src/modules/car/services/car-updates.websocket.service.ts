import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "ws";
import { map, Subject } from "rxjs";
import { CarInfoUpdateDto } from "../dto/car-info-update.dto";

@WebSocketGateway(+process.env.WEBSOCKET_PORT)
export class CarUpdatesWebsocketService {
    @WebSocketServer()
    private server: Server;

    private data: Subject<CarInfoUpdateDto> = new Subject<CarInfoUpdateDto>();

    sendMessage(msg: CarInfoUpdateDto) {
        this.data.next(msg);
    }

    @SubscribeMessage('car-update')
    private sendUpdate() {
        return this.data.pipe(
            map((value) => ({
                event: 'car-update',
                ...value
            }))
        );
    }
}
