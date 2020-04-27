interface InfraConfigurations {
    element?: HTMLElement;
}

export interface AppConfigurations {
    debug: boolean;
    serviceBaseUrl: string;
    minimized: boolean;
    disableDarkMode: boolean;
    text: {
        minimizedTitle?: string;
        formTitle?: string;
        formSubTitle?: string;
        thankYouTitle?: string;
        thankYouBody?: string;
        faqTitle?: string;
    };
    styles: {
        classNameContainer?: string;
    };
}

export type Configurations = InfraConfigurations & AppConfigurations;

export const defaultConfig: Configurations = {
    debug: false,
    serviceBaseUrl: '',
    minimized: false,
    disableDarkMode: false,
    text: {},
    styles: {}
};
