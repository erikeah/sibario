import { Injectable } from '@nestjs/common';
import { Booking } from 'src/core/models';

@Injectable()
export class BookingService {
    async get(booking: { id: string }): Promise<Booking> {
        return Promise.resolve(
            new Booking({
                id: booking.id,
                date: '',
                seats: 5,
                client: 'me',
            }),
        );
    }
}
