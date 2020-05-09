import { h, Fragment } from 'preact';
import { useContext, useState, useEffect } from 'preact/hooks';
import { ServiceContext } from '../context';
import style from './faq.css';
import { FaqModel } from '../models';
import clsx from 'clsx';
import { RouteLink } from '../layout/Router';

const Faq = () => {
    const service = useContext(ServiceContext);
    const [questions, setQuestions] = useState<FaqModel[] | undefined>(undefined);
    const [visible, setVisible] = useState(0);

    useEffect(() => {
        service?.getFaq().then(setQuestions);
    }, [service]);

    return (
        <div>
            {
                !questions
                    ? 'Loading...'
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
