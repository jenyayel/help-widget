import { h } from 'preact';
import style from './main.css';
import ContactForm from '../routes/ContactForm';
import ThankYou from '../routes/ThankYou';
import { useContext, useState } from 'preact/hooks';
import { ConfigContext } from '../AppContext';
import clsx from 'clsx';
import TitleBar from '../components/TitleBar';
import Faq from '../routes/Faq';
import { Router, RouteComponent } from './Router';

const Main = () => {
    const config = useContext(ConfigContext);
    const [title, setTitle] = useState('');
    const [minimized, setMinimized] = useState(config.minimized);
    const getTitle = (route: string) => {
        switch (route) {
            case '/thankyou':
                return config.text.thankYouTitle ?? 'Thank You';
            case '/faq':
                return config.text.faqTitle ?? 'FAQ';
            case '/':
            default:
                return config.text.formTitle ?? 'Contact Form';
        }
    };

    return (
        <div className={clsx(style.root, { [style.noDark]: config.disableDarkMode })}>
            <div>
                <TitleBar routeTitle={title}
                    onMinimize={() => setMinimized(true)}
                    onOpen={() => setMinimized(false)} />
                <div className={clsx(
                    style.container,
                    { [style.minimized]: minimized },
                    config.styles.classNameContainer)}>
                    <Router
                        onChange={(r) => setTitle(getTitle(r))}
                        routes={{
                            '/': <RouteComponent component={ContactForm} />,
                            '/thankyou': <RouteComponent component={ThankYou} />,
                            '/faq': <RouteComponent component={Faq} />
                        }} />
                </div>
            </div>
        </div >);
};

export default Main;
