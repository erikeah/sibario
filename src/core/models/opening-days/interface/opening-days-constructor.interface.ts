import { OpeningHoursConstructor } from '../../opening-hours';

export interface OpeningDaysConstructor {
    monday: OpeningHoursConstructor[];
    tuesday: OpeningHoursConstructor[];
    wednesday: OpeningHoursConstructor[];
    thursday: OpeningHoursConstructor[];
    friday: OpeningHoursConstructor[];
    saturday: OpeningHoursConstructor[];
    sunday: OpeningHoursConstructor[];
}
