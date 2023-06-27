import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceEntity } from 'src/adapters/outbounds/mysql-place-repository/place.entity';
import { PlaceService } from './place.service';
import { PlaceConfig } from './place.config';

@Module({
    imports: [TypeOrmModule.forFeature([PlaceEntity])],
    providers: [PlaceService, PlaceConfig.PlaceRepository],
    exports: [PlaceService],
})
export class PlaceModule {}
