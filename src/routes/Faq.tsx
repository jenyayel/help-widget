import { h, Fragment } from 'preact';
import { useContext, useState, useEffect } from 'preact/hooks';
import { ServiceContext } from '../AppContext';
import style from './faq.css';
import { FaqModel } from '../models';
import clsx from 'clsx';
import { RouteLink } from '../layout/Router';
import { useTimeout } from '../hooks';

const Faq = () => {
    const service = useContext(ServiceContext);
    const [questions, setQuestions] = useState<FaqModel[] | undefined>(undefined);
    const [visible, setVisible] = useState(0);
    const [statusText, setStatusText] = useState('');

    const loaders = [
        useTimeout(() => !questions && setStatusText('Loading...'), 500),
        useTimeout(() => !questions && setStatusText('Still loading...'), 5000),
        useTimeout(() => !questions && setStatusText('Backend still didn\'t return results...'), 10000)];

    useEffect(() => {
        service?.getFaq()
            .then(setQuestions)
            .catch(() => setStatusText('Failed to load, try again later.'))
            .then(() => loaders.forEach((c) => c()));
    }, [service]);

    return (
        <div>
            {
                !questions
                    ? statusText
                    : <Fragment>
                        <p>
                            Here is a list of frequently asked questions.
                            You can also contact us <RouteLink href='/'> here</RouteLink>.
                        </p>
                        <ul className={style.root}>
                            {
                                questions.map((q, i) => (
                                    <li key={i} className={clsx({ [style.visible]: i === visible })}>
                                        <a href='javascript:;' onClick={() => setVisible(i)}>{q.question}</a>
                                        <span>{q.answer}</span>
                                    </li>))
                            }
                        </ul>
                    </Fragment>
            }
        </div>
    );
};

export default Faq;
