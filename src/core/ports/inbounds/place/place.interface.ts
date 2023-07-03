import { Place } from 'src/core/models';
import { CreatePlaceInboundPayload } from './interfaces';

export interface GetPlaces {
    get(): Promise<Place[]>;
}

export interface CreatePlace {
    create(place: CreatePlaceInboundPayload): Promise<Place>;
}
