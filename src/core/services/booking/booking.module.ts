import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';

@Module({
    imports: [],
    providers: [BookingService],
    exports: [BookingService],
})
export class BookingModule {}
