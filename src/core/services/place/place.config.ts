import { MysqlPlaceRepository } from 'src/adapters/outbounds/mysql-place-repository/mysql-place-repository';
import { PlaceRepository } from 'src/core/ports/outbounds/place-repository';

export const PlaceConfig = {
    PlaceRepository: {
        provide: PlaceRepository,
        useClass: MysqlPlaceRepository,
    },
};
