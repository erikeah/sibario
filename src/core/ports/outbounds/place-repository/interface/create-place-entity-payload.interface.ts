import { OpeningDays } from 'src/core/models/opening-days/opening-days';

export interface CreatePlaceOutboundPayload {
    name: string;
    maxSeats: number;
    openingDays: OpeningDays;
}
