import { h, createContext, VNode, ComponentType, createElement } from 'preact';
import { useState, useEffect } from 'preact/hooks';

const DEFAULT_ROUTE = '/';

interface Props {
    /**
     * Specifies all URLs and their respectful components.
     */
    routes: {
        [DEFAULT_ROUTE]: VNode;
        [key: string]: VNode;
    };
    onChange?: (route: string) => void;
}

/**
 * Stores current URL of the router and allows to change it programmatically.
 */
export const RouterContext = createContext<{ route: string, setRoute: (route: string) => void }>(
    { route: DEFAULT_ROUTE, setRoute: (_: string) => undefined });

/**
 * Oversimplified router component.
 */
export const Router = ({ routes, onChange }: Props) => {
    const [route, setRoute] = useState(DEFAULT_ROUTE);
    useEffect(() => onChange?.(route), [route]);

    return (
        <RouterContext.Provider value={{ route, setRoute }}>
            {routes[route]}
        </RouterContext.Provider>
    );
};

export const RouteComponent = (props: { component: ComponentType<null> }) =>
    createElement(props.component, null);

/**
 * Render anchor with click handler to switch route based on `href` attribute.
 * We intentionally override final `href`, so links within widget won't lead to actual
 * pages on website.
 */
export const RouteLink = ({ href, children, ...rest }: h.JSX.HTMLAttributes<HTMLAnchorElement>) => (
    <RouterContext.Consumer>
        {({ setRoute }) => (
            <a href='javascript:' onClick={() => href && setRoute(href)} {...rest}>{children}</a>
        )}
    </RouterContext.Consumer>
);
