import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CarModule } from './modules/car/car.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [
        UserModule,
        CarModule,
        ConfigModule.forRoot(),
        DatabaseModule
    ]
})
export class AppModule {}
