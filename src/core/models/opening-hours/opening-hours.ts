import {
    HandledError,
    HandledErrorEnum,
} from 'src/shared/global-exception-filter';
import { HoursEnum, HoursStrings } from './hours.enum';
import { OpeningHoursConstructor } from './interface';

export class OpeningHours {
    private _open: HoursStrings;

    private _close: HoursStrings;

    constructor(object: OpeningHoursConstructor) {
        this.open = object.open as HoursStrings;
        this.close = object.close as HoursStrings;
        if (this.open > this.close) {
            throw new HandledError(
                'the opening hour cannot be later than the closing hour',
                HandledErrorEnum.InvalidData,
            );
        }
    }

    public get open(): HoursStrings {
        return this._open;
    }

    public get close(): HoursStrings {
        return this._close;
    }

    public set open(value: HoursStrings) {
        this.validateHour(value);
        this._open = value;
    }

    public set close(value: HoursStrings) {
        this.validateHour(value);
        this._close = value;
    }

    private validateHour(value: string): void {
        if (!(value in HoursEnum)) {
            throw new HandledError(
                `${value} is an invalid hour`,
                HandledErrorEnum.InvalidData,
            );
        }
    }
}
