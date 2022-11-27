import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CarEntity } from './entities/car.entity';

@ApiTags('cars')
@Controller('cars')
export class CarController {
    constructor(private readonly carService: CarService) {}

    @ApiBody({type: CreateCarDto})
    @Post()
    create(@Body() createCarDto: CreateCarDto) {
        return this.carService.create(createCarDto);
    }

    @ApiResponse({
        type: CarEntity,
        isArray: true
    })
    @Get()
    findAll() {
        return this.carService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.carService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
        return this.carService.update(+id, updateCarDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.carService.remove(+id);
    }
}
