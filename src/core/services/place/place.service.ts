import { Inject, Injectable } from '@nestjs/common';
import { Place } from 'src/core/models';
import {
    CreatePlace, DeletePlace, FindOnePlace, ListPlaces, UpdatePlace,
} from 'src/core/ports/inbounds/place';
import {
    CreatePlaceInboundPayload,
    DeletePlaceInboundPayload,
    FindOnePlaceInboundPayload,
    UpdatePlaceInboundPayload,
} from 'src/core/ports/inbounds/place/interfaces';
import { PlaceRepository } from 'src/core/ports/outbounds/place-repository';
import {
    HandledError,
    HandledErrorEnum,
} from 'src/shared/global-exception-filter';

@Injectable()
export class PlaceService implements
    ListPlaces,
    FindOnePlace,
    CreatePlace,
    DeletePlace,
    UpdatePlace {
    constructor(
        @Inject(PlaceRepository) private placeRepository: PlaceRepository,
    ) {}

    async create(payload: CreatePlaceInboundPayload): Promise<Place> {
        if (!payload.name) {
            throw new HandledError(
                'missing argument, name is required',
                HandledErrorEnum.BadRequest,
            );
        }
        const place = await this.placeRepository.create(new Place(payload));
        if (!place) throw new HandledError('place repository did not response', HandledErrorEnum.UnknowRepositoryError);
        return new Place(place);
    }

    async list(): Promise<Place[]> {
        const places = await this.placeRepository.list();
        if (!places || !Array.isArray(places)) {
            throw new HandledError(
                'place repository did not response',
                HandledErrorEnum.UnknowRepositoryError,
            );
        }
        for (let i = 0; i < places.length; i++) {
            places[i] = new Place(places[i]);
        }
        return places;
    }

    async findOne(payload: FindOnePlaceInboundPayload): Promise<Place> {
        const place = await this.placeRepository.findOne(payload.id);
        if (!place) throw new HandledError('place repository did not response', HandledErrorEnum.UnknowRepositoryError);
        return place;
    }

    async update(payload: UpdatePlaceInboundPayload): Promise<Place> {
        if (!payload.id) {
            throw new HandledError(
                'missing argument, id is required',
                HandledErrorEnum.BadRequest,
            );
        }
        const place = await this.placeRepository.update(payload.id, new Place(payload));
        if (!place) throw new HandledError('place repository did not response', HandledErrorEnum.UnknowRepositoryError);
        return new Place(place);
    }

    async delete(payload: DeletePlaceInboundPayload): Promise<void> {
        if (!payload.id) {
            throw new HandledError(
                'missing argument, id is required',
                HandledErrorEnum.BadRequest,
            );
        }
        return this.placeRepository.delete(payload.id);
    }
}
