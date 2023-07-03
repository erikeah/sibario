import {
    ArgumentsHost,
    Catch, ExceptionFilter, HttpException, HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { HandledError } from './handled-error/handled-error';
import { HandledErrorEnum } from './handled-error.enum';
import { RestError } from './rest-error/rest-error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void {
        const response = host.switchToHttp().getResponse<Response>();
        if (exception instanceof HandledError) {
            this.handled(exception, response);
        } else {
            this.unhandled(exception, response);
        }
    }

    private handled(exception: HandledError, response: Response): void {
        switch (exception.type) {
            case HandledErrorEnum.UnknowRepositoryError:
                response
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json(new RestError(HttpStatus.INTERNAL_SERVER_ERROR, exception.message));
                break;
            case HandledErrorEnum.BadRequest:
                response
                    .status(HttpStatus.BAD_REQUEST)
                    .json(new RestError(HttpStatus.BAD_REQUEST, exception.message));
                break;
            case HandledErrorEnum.InvalidData:
                response
                    .status(HttpStatus.NOT_ACCEPTABLE)
                    .json(new RestError(HttpStatus.NOT_ACCEPTABLE, exception.message));
                break;
            default:
                this.unhandled(exception, response);
        }
    }

    private unhandled(exception: unknown, response: Response): void {
        if (exception instanceof HttpException) {
            const httpStatus = exception.getStatus();
            exception.initMessage();
            const { message } = exception.getResponse() as { message: string[] | string };
            response
                .status(httpStatus)
                .json(new RestError(httpStatus, message));
        } else {
            response
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json(new RestError(HttpStatus.INTERNAL_SERVER_ERROR));
        }
    }
}
