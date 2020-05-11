import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { ConfigContext } from '../AppContext';
import { RouteLink } from '../layout/Router';

const ThankYou = () => {
    const config = useContext(ConfigContext);

    return (
        <div>
            <h2>{config.text.thankYouTitle ?? 'Thank you'}</h2>
            <p>{config.text.thankYouBody ?? 'Your message was sent to us. We\'ll contact you shortly.'}</p>
            <p>
                Meantime you can look at <RouteLink href='/faq'>FAQ area</RouteLink> for most common questions.</p>
        </div>
    );
};

export default ThankYou;
