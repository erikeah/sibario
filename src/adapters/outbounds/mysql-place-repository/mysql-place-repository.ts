import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from 'src/core/models';
import { PlaceRepository } from 'src/core/ports/outbounds/place-repository';
import { Repository } from 'typeorm';
import {
    HandledError,
    HandledErrorEnum,
} from 'src/shared/global-exception-filter';
import { CreatePlaceOutboundPayload } from 'src/core/ports/outbounds/place-repository/interface';
import { PlaceEntity } from './place.entity';

@Injectable()
export class MysqlPlaceRepository implements Partial<PlaceRepository> {
    constructor(
        @InjectRepository(PlaceEntity)
        private repository: Repository<PlaceEntity>,
    ) {}

    async list(): Promise<Place[]> {
        const place = await this.repository.find();
        if (!place) {
            throw new HandledError(
                'unable to list places',
                HandledErrorEnum.UnknowRepositoryError,
            );
        }
        return place;
    }

    async create(payload: CreatePlaceOutboundPayload): Promise<Place> {
        const place = await this.repository.save(payload);
        if (!place) {
            throw new HandledError(
                'unable to create new place',
                HandledErrorEnum.UnknowRepositoryError,
            );
        }
        return new Place(place);
    }
}
