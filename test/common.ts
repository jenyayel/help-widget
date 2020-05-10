import { Configurations } from '../src/models';

export const testConfig = (): Configurations => ({
    debug: false,
    serviceBaseUrl: '',
    minimized: false,
    disableDarkMode: false,
    text: {},
    styles: {}
});

/** This closely replicates what installation script does on page (e.g. /dev/index.html) */
export const install = (w: Window, name: string, config?: Configurations) => {
    const d = w.document;
    // tslint:disable-next-line: only-arrow-functions
    w[name] = w[name] || function () { (w[name].q = w[name].q || []).push(arguments); };
    const js = d.createElement('script');
    js.id = name;
    w[name]('init', config);

    Object.defineProperty(w.document, 'currentScript', {
        writable: true,
        value: js
    });
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
