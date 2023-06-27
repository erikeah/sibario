import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from 'src/core/models';
import { PlaceRepository } from 'src/core/ports/outbounds/place-repository';
import { Repository } from 'typeorm';
import { PlaceEntity } from './place.entity';

@Injectable()
export class MysqlPlaceRepository implements Partial<PlaceRepository> {
    constructor(
        @InjectRepository(PlaceEntity)
        private repository: Repository<PlaceEntity>,
    ) {}

    list(): Promise<Place[]> {
        return this.repository.find();
    }
}
