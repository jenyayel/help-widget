import { h } from 'preact';
import style from './titlebar.css';
import { useContext } from 'preact/hooks';
import { ConfigContext, GlobalsContext } from '../AppContext';

interface OwnProps {
    routeTitle: string;
}
const TitleBar = (props: OwnProps) => {
    const config = useContext(ConfigContext);
    const { setWidgetOpen, widgetOpen } = useContext(GlobalsContext);

    return (
        <div className={style.root} onClick={() => setWidgetOpen(!widgetOpen)}>
            <h4>{widgetOpen
                ? props.routeTitle
                : (config.text.minimizedTitle ?? 'Help')}</h4>
            <a
                className={widgetOpen ? style.open : style.minimized}
                title={widgetOpen ? 'Minimize' : 'Open'} />
        </div>);
};

export default TitleBar;
