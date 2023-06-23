import { ConfigurationEnum } from './configuration.enum';

export const Configuration = Symbol('Config');
export interface Configuration {
    getOrThrow(config: ConfigurationEnum): string;
    get(config: ConfigurationEnum): string;
}
