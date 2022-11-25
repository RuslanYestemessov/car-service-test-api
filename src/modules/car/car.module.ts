import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from './entities/car.entity';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forFeature([CarEntity])
    ],
    controllers: [CarController],
    providers: [CarService]
})
export class CarModule {}
