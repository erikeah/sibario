import { Inject, Injectable } from '@nestjs/common';
import { Place } from 'src/core/models';
import { GetPlaces } from 'src/core/ports/inbounds/place';
import { PlaceRepository } from 'src/core/ports/outbounds/place-repository';
import { HandledError, HandledErrorEnum } from 'src/shared/global-exception-filter';

@Injectable()
export class PlaceService implements GetPlaces {
    constructor(
        @Inject(PlaceRepository) private placeRepository: PlaceRepository,
    ) {}

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
