import { Place } from 'src/core/models';
import { CreatePlacePayload } from './interfaces';

export interface GetPlaces {
    get(): Promise<Place[]>;
}

export interface CreatePlace {
    create(place: CreatePlacePayload): Promise<Place>;
}
