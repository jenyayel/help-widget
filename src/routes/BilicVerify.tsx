import { h, Fragment } from 'preact';
import { useContext, useState, useEffect, useMemo } from 'preact/hooks';
import { ServiceContext } from '../AppContext';
import style from './BilicVerify.css';
import { FaqModel } from '../models';
import clsx from 'clsx';
import { RouteLink } from '../layout/Router';
import { useTimeout } from '../hooks';
import { useIsMounted } from '../hooks';
import DonutChart from '../components/DonutChart';
import Field from '../components/Field';


const BilicVerify = () => {
    const service = useContext(ServiceContext);
    const [verifyData, setverifyData] = useState<any | undefined>(undefined);
    const [statusText, setStatusText] = useState('');
    const [visible, setVisible] = useState(0);

    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState('');
    const mounted = useIsMounted();

    const [emailValue, setEmailValue] = useState('');
    const emailError = useMemo(
        () => mounted.current && (!emailValue || !(/^\S+@\S+$/.test(emailValue)))
            ? 'Email is required and must be valid' : '',
        [emailValue, submitting, mounted]);

    const formValid = useMemo(
        () => ![emailError].reduce((m, n) => m + n),
        [emailError]);

    useEffect(() => {

        if (!submitting) {
            return;
        }
        setServerError(''); // reset previous server error
        if (!formValid) {
            setSubmitting(false);
            return;
        }

        const loaders = [
            useTimeout(() => !verifyData && setStatusText('Loading...'), 500),
            useTimeout(() => !verifyData && setStatusText('Still loading...'), 5000),
            useTimeout(() => !verifyData && setStatusText('Backend still didn\'t return results...'), 10000)];


        service?.getBilicVerify({ wallet: emailValue })
            .then(setverifyData)
            .catch(() => setStatusText('Failed to load, try again later.'))
            .then(() => loaders.forEach((c) => c()))
            .then(() => setSubmitting(false));
    }, [formValid, submitting, emailValue, service]);

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitting(true);
                }}>
                {serverError && <div className={style.error}>{serverError}</div>}
                <Field
                    name='email'
                    // title='Email'
                    error={emailError}
                    render={(inputProps) => (
                        <input
                            type='text'
                            inputMode='email'
                            disabled={submitting}
                            placeholder='valid email or wallet'
                            autoFocus
                            onInput={(e) => setEmailValue(e.currentTarget.value)}
                            {...inputProps}
                        />)} />

                <div className={style.actions}>
                    <button type='submit' disabled={submitting || !formValid}>
                        {submitting ? 'Sending...' : 'Send'}
                    </button>
                </div>

            </form>

            {
                !verifyData && !submitting
                    ? statusText
                    : <Fragment>
                        <p>
                            Result: {verifyData?.wallet}.
                            {/* Information About <RouteLink href='/form'> form</RouteLink>. */}
                        </p>
                        <p>{verifyData}</p>
                        {/* <ul >
                            {
                                verifyData?.tags?.map((q: any, i: any) => (
                                    <li key={i} className={clsx({ [style.visible]: i === visible })}>
                                        <a href='javascript:;' onClick={() => setVisible(i)}>{q}</a>
                                        <span>{q}</span>
                                    </li>))
                            }
                        </ul> */}
                        {/* <DonutChart></DonutChart> */}

                    </Fragment>
            }
        </div>
    );
};

export default BilicVerify;
