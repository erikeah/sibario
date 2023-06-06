import { Injectable } from '@nestjs/common';
import { Configuration, ConfigurationEnum } from 'src/core/ports/configuration';

@Injectable()
export class EnvVarsConfiguration implements Configuration {
  get(config: ConfigurationEnum): string {
    const value = process.env[config];
    if (!value || value === '' || !Boolean(value.trim())) throw new Error(`The requested configuration with key ${config}, cannot be resolved`);
    return value;
  }
}
