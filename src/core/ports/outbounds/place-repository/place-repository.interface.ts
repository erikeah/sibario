import { PlaceEntity } from 'src/adapters/outbounds/mysql-place-repository/place.entity';
import { Place } from 'src/core/models';
import { CreatePlaceEntityPayload } from './interface';

export const PlaceRepository = 'PlaceRepository';
export interface PlaceRepository {
    create(payload: CreatePlaceEntityPayload): Promise<PlaceEntity>;
    find(id: string): Promise<PlaceEntity[]>;
    list(filter?: Partial<Place>): Promise<PlaceEntity[]>;
    update(id: string, request: Place): Promise<PlaceEntity>;
    delete(id: string): Promise<PlaceEntity>;
}
