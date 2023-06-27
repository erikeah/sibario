import { Test, TestingModule } from '@nestjs/testing';
import { PlaceRepository } from 'src/core/ports/outbounds/place-repository';
import { placeRepository } from 'test/__mocks__/place-repository';
import { PlaceService } from './place.service';

describe('PlaceService', () => {
    let service: PlaceService;

    beforeEach(async () => {
        jest.clearAllMocks();
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
            expect(service.get).toBeDefined();
        });
        it('should throw if place repository list do not response correctly', () => {
            jest.spyOn(placeRepository, 'list').mockResolvedValueOnce(
                undefined,
            );
            expect(() => service.get()).rejects.toThrowError(
                'place repository do not response',
            );
        });
        it('should return an array', async () => {
            const getResponse = await service.get();
            jest.spyOn(placeRepository, 'list').mockResolvedValueOnce([
                { id: '', name: '' },
            ]);
            expect(Array.isArray(getResponse)).toBeTruthy();
        });
    });
});
