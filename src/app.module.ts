import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { CarModule } from "./modules/car/car.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DatabaseModule } from "./common/database/database.module";
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { WidgetsModule } from './widgets/widgets.module';

@Module({
    imports: [
        UserModule,
        CarModule,
        ConfigModule.forRoot(),
        RabbitMQModule.forRootAsync(RabbitMQModule, {
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                uri: `amqp://${ configService.get(
                    'RABBIT_MQ_USER'
                ) }:${ configService.get(
                    'RABBIT_MQ_PASSWORD'
                ) }@${ configService.get(
                    'RABBIT_MQ_HOST'
                ) }:${ configService.get(
                    'RABBIT_MQ_PORT'
                ) }`
            }),
            inject: [ConfigService]
        }),
        DatabaseModule,
        WidgetsModule
    ]
})
export class AppModule {}
