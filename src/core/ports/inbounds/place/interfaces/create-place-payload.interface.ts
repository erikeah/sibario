import { OpeningDaysConstructor } from 'src/core/models/opening-days/interface';

export interface CreatePlaceInboundPayload {
    name: string
    maxSeats?: number;
    openingDays?: OpeningDaysConstructor;
}
