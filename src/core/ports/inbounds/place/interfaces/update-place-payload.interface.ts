import { OpeningDaysConstructor } from 'src/core/models';

export interface UpdatePlaceInboundPayload {
    id: string;
    name?: string
    maxSeats?: number;
    openingDays?: OpeningDaysConstructor;
}
