import { PlaceRepository } from 'src/core/ports/outbounds/place-repository';

export const placeRepository: PlaceRepository = {
    update: jest.fn(),
    findOne: jest.fn(),
    list: jest.fn().mockResolvedValue([]),
    create: jest.fn().mockResolvedValue({}),
    delete: jest.fn(),
};
