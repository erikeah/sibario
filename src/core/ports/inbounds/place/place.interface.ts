import { Place } from 'src/core/models';
import {
    CreatePlaceInboundPayload,
    DeletePlaceInboundPayload,
    FindOnePlaceInboundPayload,
    UpdatePlaceInboundPayload,
} from './interfaces';

export interface ListPlaces {
    list(): Promise<Place[]>;
}

export interface FindOnePlace {
    findOne(place: FindOnePlaceInboundPayload): Promise<Place>;
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
