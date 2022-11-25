import { Module } from '@nestjs/common';
import { CarServiceService } from './car-service.service';
import { CarServiceController } from './car-service.controller';

@Module({
  controllers: [CarServiceController],
  providers: [CarServiceService]
})
export class CarServiceModule {}
