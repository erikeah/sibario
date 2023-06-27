import { Controller, Get } from '@nestjs/common';
import { Place } from 'src/core/models';
import { PlaceService } from 'src/core/services/place';

@Controller('places')
export class PlacesController {
    constructor(private placeService: PlaceService) {}

    @Get()
    get(): Promise<Place[]> {
        return this.placeService.get();
    }
}
