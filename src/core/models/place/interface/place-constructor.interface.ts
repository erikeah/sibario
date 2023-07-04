import { OpeningDaysConstructor } from '../../opening-days/interface';

export interface PlaceConstructor {
    id?: string,
    name: string,
    maxSeats?: number,
    openingDays?: OpeningDaysConstructor,
}
