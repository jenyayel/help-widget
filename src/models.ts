interface InfraConfigurations {
    element?: HTMLElement;
}

/**
 * A model representing all possible configurations
 * that can be done from embedded script. Those settings
 * are passed around in application via Context.
 */
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

export interface Globals {
    widgetOpen: boolean;
    setWidgetOpen: (open: boolean) => void;
}
