import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpeningsEntity, PlaceEntity } from 'src/adapters/outbounds/mysql-place-repository';
import { PlaceService } from './place.service';
import { PlaceConfig } from './place.config';

@Module({
    imports: [TypeOrmModule.forFeature([PlaceEntity, OpeningsEntity])],
    providers: [PlaceService, PlaceConfig.PlaceRepository],
    exports: [PlaceService],
})
export class PlaceModule {}
