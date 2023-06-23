import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfiguration {
    constructor(private configService: ConfigService) {}

    get(variable: string): string {
        return this.configService.get(variable);
    }

    getOrThrow(variable: string): string {
        return this.configService.getOrThrow(variable);
    }
}
