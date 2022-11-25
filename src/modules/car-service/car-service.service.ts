import { Injectable } from '@nestjs/common';
import { CreateCarServiceDto } from './dto/create-car-service.dto';
import { UpdateCarServiceDto } from './dto/update-car-service.dto';

@Injectable()
export class CarServiceService {
  create(createCarServiceDto: CreateCarServiceDto) {
    return 'This action adds a new carService';
  }

  findAll() {
    return `This action returns all carService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carService`;
  }

  update(id: number, updateCarServiceDto: UpdateCarServiceDto) {
    return `This action updates a #${id} carService`;
  }

  remove(id: number) {
    return `This action removes a #${id} carService`;
  }
}
