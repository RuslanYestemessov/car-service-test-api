import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CarModule } from './modules/car/car.module';
import { CarServiceModule } from './modules/car-service/car-service.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        UserModule,
        CarModule,
        CarServiceModule,
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: configService.get('DATABASE_TYPE'),
                host: configService.get('POSTGRES_HOST'),
                port: configService.get('POSTGRES_PORT'),
                username: configService.get('POSTGRES_USER'),
                password: configService.get('POSTGRES_PASSWORD'),
                database: configService.get('POSTGRES_DATABASE'),
                autoLoadEntities: true,
                synchronize: true
            }) as TypeOrmModuleOptions
        })
    ]
})
export class AppModule {}
