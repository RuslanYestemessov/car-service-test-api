import { CarEntity } from '../entities/car.entity';
import { PickType } from '@nestjs/swagger';

export class CarInfoUpdateDto extends PickType(CarEntity, ['id', 'remainingFuel', 'coordinates']) {}
