import { h, render } from 'preact';
import { App } from './App';
import loader from './loader';
import { Configurations } from './models';

/**
 * Default configurations that are overridden by
 * parameters in embedded script.
 */
const defaultConfig: Configurations = {
    debug: false,
    serviceBaseUrl: 'https://help-widget-backend.glitch.me',
    minimized: false,
    disableDarkMode: false,
    text: {},
    styles: {}
};

// main entry point - calls loader and render Preact app into supplied element
loader(window, defaultConfig, (el, config) => render(h(App, { ...config }), el));
