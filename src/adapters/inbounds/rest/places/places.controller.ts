import {
    Body, Controller, Get, Post,
} from '@nestjs/common';
import { Place } from 'src/core/models';
import { PlaceService } from 'src/core/services/place';
import { PostPlaceBodyDto } from './dtos';

@Controller('places')
export class PlacesController {
    constructor(private placeService: PlaceService) {}

    @Get()
    get(): Promise<Place[]> {
        return this.placeService.get();
    }

    @Post()
    post(@Body() body: PostPlaceBodyDto): Promise<Place> {
        return this.placeService.create(body);
    }
}
