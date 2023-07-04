import { OpeningDays } from '../opening-days/opening-days';
import { PlaceConstructor } from './interface';

export class Place {
    id: string;

    name: string;

    maxSeats: number;

    openingDays: OpeningDays;

    constructor(object: PlaceConstructor) {
        this.id = object.id;
        this.name = object.name;
        this.maxSeats = object.maxSeats;
        if (object.openingDays) this.openingDays = new OpeningDays(object.openingDays);
    }
}
