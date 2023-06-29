export class RestError {
    status: number;

    message?: string[];

    constructor(status = 500, message?: string | string[]) {
        this.status = status;
        if (Array.isArray(message)) this.message = message;
        else this.message = [message];
    }
}
