import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CarService } from "../modules/car/services/car.service";

@ApiTags('widgets')
@Controller('widgets')
export class WidgetsController {
    constructor(private readonly carService: CarService) {}

    @Get('fuel/:id')
    getFuel(@Param('id') id: string) {
        return this.carService.getCarFuelInfo(+id);
    }

    @Get('service/:id')
    getService(@Param('id') id: string) {
        return this.carService.getCarMaintenanceInfo(+id);
    }

    @Get('fine/:id')
    getFine(@Param('id') id: string) {
        return '';
    }

    @Get('parking/:id')
    getParking(@Param('id') id: string) {
        return '';
    }

    @Get('gas-station/:id')
    getGasStation(@Param('id') id: string) {
        return '';
    }
}
