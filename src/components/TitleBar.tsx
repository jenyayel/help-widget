import { h } from 'preact';
import style from './titlebar.css';
import { useContext, useState, useEffect } from 'preact/hooks';
import { ConfigContext } from '../AppContext';

interface OwnProps {
    onOpen?: () => void;
    onMinimize?: () => void;
    routeTitle: string;
}
const TitleBar = (props: OwnProps) => {
    const config = useContext(ConfigContext);
    const [minimized, setMinimized] = useState(config.minimized);
    useEffect(() => {
        if (minimized) {
            props.onMinimize?.();
        } else {
            props.onOpen?.();
        }
    }, [minimized, props.onMinimize, props.onOpen]);

    return (
        <div className={style.root} onClick={() => setMinimized(!minimized)}>
            <h4>{minimized
                ? config.text.minimizedTitle ?? 'Help'
                : props.routeTitle}</h4>
            <a
                className={minimized ? style.minimized : style.open}
                title={minimized ? 'Open' : 'Minimize'} />
        </div>);
};

export default TitleBar;
