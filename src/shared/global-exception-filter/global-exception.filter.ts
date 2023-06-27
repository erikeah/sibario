import {
    ArgumentsHost,
    Catch, ExceptionFilter, HttpException, HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { HandledError } from './handled-error/handled-error';
import { HandledErrorEnum } from './handled-error.enum';

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
                    .json({ message: exception.message });
                break;
            default:
                this.unhandled(exception, response);
        }
    }

    private unhandled(exception: unknown, response: Response): void {
        const httpStatus = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        response.status(httpStatus).json({});
    }
}
