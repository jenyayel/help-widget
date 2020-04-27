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
    serviceBaseUrl: 'https://ts-wisget-backend.glitch.me',
    minimized: false,
    disableDarkMode: false,
    text: {},
    styles: {}
};

export interface FaqModel {
    question: string;
    answer: string;
}

export interface FormModel {
    email: string;
    message: string;
}

export interface WidgetApi {
    getFaq: () => Promise<FaqModel[]>;
    sendForm: (model: FormModel) => Promise<void>;
}
