import { Module } from '@nestjs/common';
import { Configuration, ConfigurationEnum } from './core/ports/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from './app.config';
import { BookingModule } from './core/services/booking';
import { PlaceController } from './adapters/inbounds/rest/place/place.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      extraProviders: [AppConfig.Configuration],
      inject: [Configuration],
      useFactory: (configuration: Configuration) => ({
        type: 'mysql',
        host: configuration.get(ConfigurationEnum.MYSQL_HOST),
        username: configuration.get(ConfigurationEnum.MYSQL_USERNAME),
        password: configuration.get(ConfigurationEnum.MYSQL_PASSWORD),
        database: configuration.get(ConfigurationEnum.MYSQL_DATABASE),
        synchronize: true,
      }),
    }),
    BookingModule,
  ],
  controllers: [PlaceController],
})
export class AppModule {}
