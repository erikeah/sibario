import { OpeningHoursConstructor } from '../opening-hours/interface';
import { OpeningHours } from '../opening-hours/opening-hours';
import { OpeningDaysConstructor } from './interface';

export class OpeningDays {
    monday: OpeningHours[];

    tuesday: OpeningHours[];

    wednesday: OpeningHours[];

    thursday: OpeningHours[];

    friday: OpeningHours[];

    saturday: OpeningHours[];

    sunday: OpeningHours[];

    constructor(object: OpeningDaysConstructor) {
        Object.entries(object).forEach(([name, hours]) => {
            this[name] = this.createOpeningHours(hours);
        });
    }

    private createOpeningHours(hours: OpeningHoursConstructor[]): OpeningHours[] {
        for (let i = 0; i < hours.length; i++) {
            hours[i] = new OpeningHours(hours[i]);
        }
        return hours as OpeningHours[];
    }
}
