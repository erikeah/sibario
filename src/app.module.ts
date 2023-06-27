import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {
    Configuration,
    ConfigurationEnum,
} from './core/ports/outbounds/configuration';
import { AppConfig } from './app.config';
import { BookingModule } from './core/services/booking';
import { PlacesController } from './adapters/inbounds/rest/places/places.controller';
import { PlaceModule } from './core/services/place/place.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            extraProviders: [AppConfig.Configuration],
            inject: [Configuration],
            useFactory: (configuration: Configuration) => ({
                type: 'mysql',
                host: configuration.getOrThrow(ConfigurationEnum.MYSQL_HOST),
                username: configuration.getOrThrow(
                    ConfigurationEnum.MYSQL_USERNAME,
                ),
                password: configuration.getOrThrow(
                    ConfigurationEnum.MYSQL_PASSWORD,
                ),
                database: configuration.getOrThrow(
                    ConfigurationEnum.MYSQL_DATABASE,
                ),
                synchronize: true,
                autoLoadEntities: true,
            }),
        }),
        BookingModule,
        PlaceModule,
    ],
    controllers: [PlacesController],
    providers: [AppConfig.Configuration],
})
export class AppModule {}
