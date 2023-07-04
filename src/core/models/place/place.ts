import { OpeningDaysConstructor } from '../opening-days';
import { OpeningDays } from '../opening-days/opening-days';
import { PlaceConstructor } from './interface';

export class Place {
    id: string;

    name: string;

    maxSeats: number;

    private _openingDays: OpeningDays;

    constructor(object: PlaceConstructor) {
        this.id = object.id;
        this.name = object.name;
        this.maxSeats = object.maxSeats;
        if (object.openingDays) this.openingDays = object.openingDays;
    }

    public get openingDays(): OpeningDays {
        return this._openingDays;
    }

    public set openingDays(value: OpeningDaysConstructor) {
        this._openingDays = new OpeningDays(value);
    }
}
