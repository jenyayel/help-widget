import { h } from 'preact';
import { Configurations } from './models';
import Main from './layout/Main';
import { AppContext } from './context';

type Props = Configurations;
export const App = ({ element, ...appSettings }: Props) => (
    <AppContext config={appSettings}>
        <Main />
    </AppContext>
);
