import { PlaceRepository } from 'src/core/ports/outbounds/place-repository';

export const placeRepository: PlaceRepository = {
    update: jest.fn(),
    find: jest.fn(),
    list: jest.fn().mockResolvedValue([]),
    create: jest.fn(),
    delete: jest.fn(),
};
