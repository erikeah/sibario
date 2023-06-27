import { Test, TestingModule } from '@nestjs/testing';
import { PlacesController } from './places.controller';
import { PlaceService } from 'src/core/services/place';
import { placeService } from 'test/__mocks__/place-service';

describe('PlacesController', () => {
    let controller: PlacesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [{ provide: PlaceService, useValue: placeService }],
            controllers: [PlacesController],
        }).compile();

        controller = module.get<PlacesController>(PlacesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
