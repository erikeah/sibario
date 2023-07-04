import { OpeningDaysConstructor } from 'src/core/models';

export interface PlaceEntityConstructor {
    id?: string;
    name: string;
    maxSeats?: number;
    openingDays: OpeningDaysConstructor;
}
