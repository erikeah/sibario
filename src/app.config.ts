import { EnvVarsConfiguration } from './adapters/outbounds/env-vars-configuration/env-vars-configuration';
import { Configuration } from './core/ports/configuration';

export const AppConfig = {
  Configuration: { provide: Configuration, useClass: EnvVarsConfiguration },
};
