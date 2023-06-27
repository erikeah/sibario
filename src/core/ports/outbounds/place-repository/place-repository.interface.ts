import { Place } from 'src/core/models';

export const PlaceRepository = 'PlaceRepository';
export interface PlaceRepository {
    create(request: Place): Promise<Place>;
    find(id: string): Promise<Place[]>;
    list(filter?: Partial<Place>): Promise<Place[]>;
    update(id: string, request: Place): Promise<Place>;
    delete(id: string): Promise<Place>;
}
