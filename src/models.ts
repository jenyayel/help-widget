interface InfraConfigurations {
    element?: HTMLElement;
}

export interface AppConfigurations {
    debug: boolean;
}

export type Configurations = InfraConfigurations & AppConfigurations;

export const defaultConfig: Configurations = {
    debug: false,
};
