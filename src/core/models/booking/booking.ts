import { Dayjs } from 'dayjs';
import { BookingInput, BookingStatus } from './interface';
import { InvalidBookingDate } from './booking-error.contansts';
import { Place } from '../place/place';

export class Booking {
    id: string;

    seats: number;

    client: string;

    place: Place;

    private dateProp: string;

    private statusProp: BookingStatus;

    constructor(payload: BookingInput) {
        this.id = payload.id;
        this.seats = payload.seats;
        this.client = payload.client;
    }

    public get date(): string {
        return new Dayjs(this.dateProp).toISOString();
    }

    public get status(): BookingStatus {
        if (this.statusProp === BookingStatus.CANCELLED) return this.statusProp;
        if (new Dayjs().unix() < new Dayjs(this.date).unix())
            return BookingStatus.TERMINATED;
        return BookingStatus.ON_TIME;
    }

    public set date(value: string) {
        if (new Dayjs(value).isValid())
            this.dateProp = new Dayjs(value).toISOString();
        else throw new Error(InvalidBookingDate);
    }

    public set status(value: BookingStatus) {
        this.statusProp = value;
    }
}
