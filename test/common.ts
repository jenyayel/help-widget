import { Configurations } from '../src/models';

export const testConfig = (override?: {}): Configurations => Object.assign({
    debug: false,
    serviceBaseUrl: '',
    minimized: false,
    disableDarkMode: false,
    text: {},
    styles: {}
}, override);

/** This closely replicates what installation script does on page (e.g. /dev/index.html) */
export const install = (name: string, config?: Partial<Configurations>) => {
    const w = window;
    // tslint:disable-next-line: only-arrow-functions
    w[name] = w[name] || function() { (w[name].q = w[name].q || []).push(arguments); };
    w[name]('init', config);
};

export const currentScript = (name: string) => {
    const d = window.document;
    const js = d.createElement('script');
    js.id = name;
    return js;
};

export const randomNumber = (max: number = 5): number => {
    return Math.floor(Math.random() * Math.floor(max));
};

export const randomStr = (length: number = 5): string => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(randomNumber(possible.length));
    }

    return text;
};
