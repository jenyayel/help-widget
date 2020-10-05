import { h } from 'preact';
import { Configurations } from './models';
import Main from './layout/Main';
import { AppContext } from './AppContext';

type Props = Configurations;
export const App = ({ element, ...appSettings }: Props) => (
    <AppContext config={appSettings} element={element}>
        <Main />
    </AppContext>
);
