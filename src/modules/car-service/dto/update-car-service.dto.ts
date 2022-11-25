import { PartialType } from '@nestjs/mapped-types';
import { CreateCarServiceDto } from './create-car-service.dto';

export class UpdateCarServiceDto extends PartialType(CreateCarServiceDto) {}
