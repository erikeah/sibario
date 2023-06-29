import { Inject, Injectable } from '@nestjs/common';
import { Place } from 'src/core/models';
import { CreatePlace, GetPlaces } from 'src/core/ports/inbounds/place';
import { CreatePlacePayload } from 'src/core/ports/inbounds/place/interfaces';
import { PlaceRepository } from 'src/core/ports/outbounds/place-repository';
import { HandledError, HandledErrorEnum } from 'src/shared/global-exception-filter';

@Injectable()
export class PlaceService implements GetPlaces, CreatePlace {
    constructor(
        @Inject(PlaceRepository) private placeRepository: PlaceRepository,
    ) {}

    async create(payload: CreatePlacePayload): Promise<Place> {
        if (!payload.name) throw new HandledError('missing arguments', HandledErrorEnum.BadRequest);
        const place = await this.placeRepository.create(payload);
        if (!place) throw new HandledError('place repository did not response', HandledErrorEnum.UnknowRepositoryError);
        return new Place(place.id, place.name);
    }

    async get(): Promise<Place[]> {
        const places = await this.placeRepository.list();
        if (!places || !Array.isArray(places)) {
            throw new HandledError('place repository did not response', HandledErrorEnum.UnknowRepositoryError);
        }
        for (let i = 0; i < places.length; i++) {
            places[i] = new Place(places[i].id, places[i].name);
        }
        return places;
    }
}
