import { ConfigurationEnum } from "./configuration.enum";

export interface Configuration {
    get(config: ConfigurationEnum): string;
}
export const Configuration = Symbol('Config');
