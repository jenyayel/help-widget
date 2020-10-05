import { h, createContext, ComponentChildren } from 'preact';
import { AppConfigurations, WidgetApi, Globals } from './models';
import { useEffect, useRef, useState } from 'preact/hooks';
import { ApiClient } from './services/apiClient';

export const ConfigContext = createContext<AppConfigurations>({} as AppConfigurations);
export const ServiceContext = createContext<WidgetApi | undefined>(undefined);
export const GlobalsContext = createContext<Globals>({ widgetOpen: false, setWidgetOpen: (o) => undefined });

interface Props {
    children: ComponentChildren;
    config: AppConfigurations;
    element?: HTMLElement;
}
export const AppContext = ({ children, config, element }: Props) => {
    const services = useRef(new ApiClient({
        baseUrl: config.serviceBaseUrl,
        debug: config.debug
    }));

    const [widgetOpen, setWidgetOpen] = useState(!config.minimized);
    useEffect(() => {
        element?.addEventListener('widget-event', (e: CustomEvent<{ name?: string }>) => {
            switch (e.detail.name) {
                case 'open':
                    setWidgetOpen(true);
                    break;
                case 'close':
                    setWidgetOpen(false);
                    break;
            }
        });
    }, [element]);

    return (
        <ConfigContext.Provider value={config}>
            <ServiceContext.Provider value={services.current}>
                <GlobalsContext.Provider value={{ widgetOpen, setWidgetOpen }}>
                    {children}
                </GlobalsContext.Provider>
            </ServiceContext.Provider>
        </ConfigContext.Provider>
    );
};
