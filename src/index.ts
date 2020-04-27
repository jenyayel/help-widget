import { h, render } from 'preact';
import { defaultConfig } from './models';
import { App } from './App';

type MethodNames = 'init';
const DEFAULT_NAME = '_hw';

/**
 * Represents a model that is created in embedded script
 * as part of script initialization.
 */
interface LoaderObject {
    /**
     * Queue that accumulates method calls during downloading
     * and loading of widget's script file.
     */
    q: Array<[MethodNames, {}]>;
}

const app = (window: Window) => {

    // get a hold of script tag instance, which has an
    // atribute `id` with unique identifier of the widget instance
    const instanceName = document.currentScript?.attributes.getNamedItem('id')?.value ?? DEFAULT_NAME;
    const loaderObject: LoaderObject = window[instanceName];
    if (!loaderObject || !loaderObject.q) {
        throw new Error(`Widget didn't find LoaderObject for instance [${instanceName}]. ` +
            `The loading script was either modified, no call to 'init' method was done ` +
            `or there is conflicting object defined in \`window.${instanceName}\` .`);
    }

    // check that the widget is not loaded twice under the same name
    if (window[`loaded-${instanceName}`]) {
        throw new Error(`Widget with name [${instanceName}] was already loaded. `
            + `This means you have multiple instances with same identifier (e.g. '${DEFAULT_NAME}')`);
    }

    // iterate over all methods that were called up until now
    for (let i = 0; i < loaderObject.q.length; i++) {
        const item = loaderObject.q[i];
        const methodName = item[0];
        if (i === 0 && methodName !== 'init') {
            throw new Error(`Failed to start Widget [${instanceName}]. 'init' must be called before other methods.`);
        } else if (i !== 0 && methodName === 'init') {
            continue;
        }
        switch (methodName) {
            case 'init':
                const loadedObject = Object.assign(defaultConfig, item[1]);
                if (loadedObject.debug) {
                    console.log(`Starting widget [${instanceName}]`, loadedObject);
                }

                // the actual rendering of the widget
                const wrappingElement = loadedObject.element ?? window.document.body;
                const targetElement = wrappingElement.appendChild(window.document.createElement('div'));
                targetElement.setAttribute('id', `widget-${instanceName}`);
                render(h(App, { ...loadedObject }), targetElement);

                // store indication that widget instance was initialized
                window[`loaded-${instanceName}`] = true;
                break;
            // TODO: here you can handle additional async interactions
            // with the widget from page (e.q. `_hw('refreshStats')`)
            default:
                console.warn(`Unsupported method [${methodName}]`, item[1]);
        }
    }

    // once finished processing all async calls, we going
    // to convert LoaderObject into sync calls to methods
    window[instanceName] = (method: MethodNames, ...args: any[]) => {
        switch (method) {
            // TODO: here you can handle additional sync interactions
            // with the widget from page
            default:
                console.warn(`Unsupported method [${method}]`, args);
        }
    };
};
app(window);
