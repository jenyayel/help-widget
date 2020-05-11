import { h, createContext, ComponentChildren } from 'preact';
import { AppConfigurations, WidgetApi } from './models';
import { useRef } from 'preact/hooks';
import { ApiClient } from './services/apiClient';

export const ConfigContext = createContext<AppConfigurations>({} as AppConfigurations);
export const ServiceContext = createContext<WidgetApi | undefined>(undefined);

interface Props {
    children: ComponentChildren;
    config: AppConfigurations;
}
export const AppContext = ({ children, config }: Props) => {
    const services = useRef(new ApiClient({
        baseUrl: config.serviceBaseUrl,
        debug: config.debug
    }));
    return (
        <ConfigContext.Provider value={config}>
            <ServiceContext.Provider value={services.current}>
                {children}
            </ServiceContext.Provider>
        </ConfigContext.Provider>
    );
};
