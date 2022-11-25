import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarServiceService } from './car-service.service';
import { CreateCarServiceDto } from './dto/create-car-service.dto';
import { UpdateCarServiceDto } from './dto/update-car-service.dto';

@Controller('car-service')
export class CarServiceController {
  constructor(private readonly carServiceService: CarServiceService) {}

  @Post()
  create(@Body() createCarServiceDto: CreateCarServiceDto) {
    return this.carServiceService.create(createCarServiceDto);
  }

  @Get()
  findAll() {
    return this.carServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carServiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarServiceDto: UpdateCarServiceDto) {
    return this.carServiceService.update(+id, updateCarServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carServiceService.remove(+id);
  }
}
