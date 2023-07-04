import { Test, TestingModule } from '@nestjs/testing';
import { PlaceRepository } from 'src/core/ports/outbounds/place-repository';
import { placeRepository } from 'test/__mocks__/place-repository';
import { CreatePlaceInboundPayload } from 'src/core/ports/inbounds/place/interfaces';
import { Place } from 'src/core/models';
import { PlaceService } from './place.service';

describe('PlaceService', () => {
    let service: PlaceService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PlaceService,
                { provide: PlaceRepository, useValue: placeRepository },
            ],
        }).compile();
        service = module.get<PlaceService>(PlaceService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('get', () => {
        it('should be defined', () => {
            expect(service.list).toBeDefined();
        });
        it('should return an array', async () => {
            jest.spyOn(placeRepository, 'list').mockResolvedValueOnce([
                { id: '', name: '', maxSeats: 54 } as Place,
            ]);
            const getResponse = await service.list();
            expect(Array.isArray(getResponse)).toBeTruthy();
        });
        it('should throw if place repository list did not response correctly', () => {
            jest.spyOn(placeRepository, 'list').mockResolvedValueOnce(
                undefined,
            );
            expect(() => service.list()).rejects.toThrowError(
                'place repository did not response',
            );
        });
    });

    describe('create', () => {
        it('should be defined', () => {
            expect(service.create).toBeDefined();
        });
        it('should throw if name at the payload is not provided', () => {
            expect(() => service.create({} as CreatePlaceInboundPayload)).rejects.toThrowError('missing argument, name is required');
        });
        it('should throw if place repository list did not response correctly', () => {
            jest.spyOn(placeRepository, 'create').mockResolvedValueOnce(
                undefined,
            );
            expect(() => service.create({ name: 'sibario' })).rejects.toThrowError(
                'place repository did not response',
            );
        });
    });
});
