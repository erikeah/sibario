import { Place } from 'src/core/models';

export interface GetPlaces {
    get(): Promise<Place[]>;
}
