import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from 'src/adapters/outbounds/mysql-booking-repository/booking.entity';
import { PlaceEntity } from 'src/adapters/outbounds/mysql-place-repository/place.entity';
import { BookingService } from './booking.service';

@Module({
    imports: [TypeOrmModule.forFeature([BookingEntity, PlaceEntity])],
    providers: [BookingService],
    exports: [BookingService],
})
export class BookingModule {}
