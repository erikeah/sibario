import { Controller, Get } from '@nestjs/common';
import { Booking } from 'src/core/models';
import { BookingService } from 'src/core/services/booking';

@Controller('places')
export class PlacesController {
    constructor(private bookingService: BookingService) {}

    @Get()
    get(): Promise<Booking> {
        return this.bookingService.get({ id: 'hello' });
    }
}
