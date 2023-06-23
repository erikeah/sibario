import { Provider } from '@nestjs/common';
import { EnvConfiguration } from './adapters/outbounds/env-configuration/env-configuration';
import { Configuration } from './core/ports/outbounds/configuration';

export const AppConfig: Record<string, Provider> = {
    Configuration: { provide: Configuration, useClass: EnvConfiguration },
};
