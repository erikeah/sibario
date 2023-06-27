import { HandledErrorEnum } from '../handled-error.enum';

export class HandledError extends Error {
    type: HandledErrorEnum;

    constructor(message: string, type: HandledErrorEnum) {
        super(message);
        this.type = type;
    }
}
