import {
    HandledError,
    HandledErrorEnum,
} from 'src/shared/global-exception-filter';
import { HoursEnum, HoursStrings } from './hours.enum';
import { OpeningHoursConstructor } from './interface';

export class OpeningHours {
    open: HoursStrings;

    close: HoursStrings;

    constructor(object: OpeningHoursConstructor) {
        this.set(object);
    }

    set(object: OpeningHoursConstructor): void {
        const open = this.validateFormat(object.open);
        const close = this.validateFormat(object.close);
        if (HoursEnum[open] > HoursEnum[close]) {
            throw new HandledError(
                'the opening hour cannot be later than the closing hour',
                HandledErrorEnum.InvalidData,
            );
        }
        this.open = open;
        this.close = close;
    }

    private validateFormat(value: string): HoursStrings {
        if (!(value in HoursEnum)) {
            throw new HandledError(
                `${value} is an invalid hour`,
                HandledErrorEnum.InvalidData,
            );
        }
        return value as HoursStrings;
    }
}
