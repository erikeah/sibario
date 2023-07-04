import { Place } from 'src/core/models';
import { CreatePlaceInboundPayload, DeletePlaceInboundPayload, UpdatePlaceInboundPayload } from './interfaces';

export interface GetPlaces {
    get(): Promise<Place[]>;
}

export interface CreatePlace {
    create(place: CreatePlaceInboundPayload): Promise<Place>;
}

export interface UpdatePlace {
    update(place: UpdatePlaceInboundPayload): Promise<Place>;
}

export interface DeletePlace {
    delete(place: DeletePlaceInboundPayload): Promise<void>;
}
