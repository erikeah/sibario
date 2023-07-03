import dayjs from 'dayjs';
import {
    HandledError,
    HandledErrorEnum,
} from 'src/shared/global-exception-filter';
import { Place } from '../place/place';
import { BookingStatusEnum } from './booking-status.enum';

export class Booking {
    id: string;

    seats: number;

    client: string;

    place: Place;

    private _date: string;

    private _status: BookingStatusEnum;

    constructor(payload: Partial<Booking>) {
        this.id = payload.id;
        this.seats = payload.seats;
        this.client = payload.client;
        this.place = payload.place;
        this.date = payload.date;
        this.status = payload.status;
    }

    public get date(): string {
        return dayjs(this._date).toISOString();
    }

    public get status(): BookingStatusEnum {
        if (
            this._status === BookingStatusEnum.CANCELLED
            || this._status === BookingStatusEnum.RESERVED
            || this._status === BookingStatusEnum.TERMINATED
        ) {
            return this._status;
        }
        if (dayjs().unix() < dayjs(this.date).unix()) return BookingStatusEnum.TERMINATED;
        return BookingStatusEnum.RESERVED;
    }

    public set date(value: string) {
        if (dayjs(value).isValid()) {
            this._date = dayjs(value).toISOString();
        } else {
            throw new HandledError(
                'Invalid booking date',
                HandledErrorEnum.InvalidData,
            );
        }
    }

    public set status(value: BookingStatusEnum) {
        if (!value) return;
        if (
            value === BookingStatusEnum.CANCELLED
            || value === BookingStatusEnum.RESERVED
            || value === BookingStatusEnum.TERMINATED
        ) {
            this._status = value;
        } else {
            throw new HandledError(
                'Invalid booking status',
                HandledErrorEnum.InvalidData,
            );
        }
    }
}
