import {
    Body, Controller, Get, Param, Post, Delete, Patch,
} from '@nestjs/common';
import { Place } from 'src/core/models';
import { PlaceService } from 'src/core/services/place';
import { PatchPlaceBodyDto, PostPlaceBodyDto } from '../dtos';

@Controller('places')
export class PlacesController {
    constructor(private placeService: PlaceService) {}

    @Get()
    get(): Promise<Place[]> {
        return this.placeService.list();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<Place> {
        return this.placeService.findOne({ id });
    }

    @Post()
    post(@Body() body: PostPlaceBodyDto): Promise<Place> {
        return this.placeService.create(body);
    }

    @Patch(':id')
    patch(@Param('id') id: string, @Body() body: PatchPlaceBodyDto): Promise<Place> {
        return this.placeService.update({ ...body, id });
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<object> {
        await this.placeService.delete({ id });
        return {};
    }
}
