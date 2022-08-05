import { h, Fragment } from 'preact';
import { useContext, useState, useEffect, useMemo } from 'preact/hooks';
import { ServiceContext } from '../AppContext';
import style from './BilicVerify.css';
import { FaqModel } from '../models';
import clsx from 'clsx';
import { RouteLink } from '../layout/Router';
import { useTimeout } from '../hooks';
import { useIsMounted } from '../hooks';
import DonutChart from '../components/charts/DonutChart';
import Field from '../components/Field';
import './BilicVerifyStyles.css';
import SpeakerImage from '../assets/images/speaker.svg';
import FaqImage from '../assets/images/faq.svg';
import GaugeChart from '../components/charts/Gauge';
import Score from '../components/charts/Score';
import { Link } from '@fluentui/react';

const BilicVerify = () => {
    const service = useContext(ServiceContext);
    const [verifyData, setverifyData] = useState<any | undefined>(undefined);
    // const [verifyData, setverifyData] = useState<any | undefined>(undefined);
    const [statusText, setStatusText] = useState('');
    const [visible, setVisible] = useState(0);

    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState('');
    const mounted = useIsMounted();

    const [emailValue, setEmailValue] = useState('');
    const emailError = useMemo(
        // () => mounted.current && (!emailValue || !(/^\S+@\S+$/.test(emailValue)))
        () =>
            mounted.current &&
                (!emailValue || !/^0x[a-fA-F0-9]{40}$/.test(emailValue))
                ? 'ETH wallet is required and must be valid'
                : '',
        // ? 'Email or wallet is required and must be valid' : '',
        [emailValue, submitting, mounted]
    );

    const formValid = useMemo(
        () => ![emailError].reduce((m, n) => m + n),
        [emailError]
    );

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
            useTimeout(
                () => !verifyData && setStatusText('Still loading...'),
                5000
            ),
            useTimeout(
                () =>
                    !verifyData &&
                    setStatusText("Backend still didn't return results..."),
                10000
            ),
        ];

        service
            ?.getBilicVerify({ wallet: emailValue })
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
                }}
            >
                {serverError && (
                    <div className={style.error}>{serverError}</div>
                )}

                <h6>👋</h6>
                <p>
                    Start by entering an ETH wallet address to verify it's
                    wallet risk score{' '}
                </p>
                <Field
                    name="email"
                    // title='Email'
                    error={emailError}
                    render={(inputProps) => (
                        <input
                            type="text"
                            inputMode="email"
                            disabled={submitting}
                            placeholder="Enter ETH address"
                            autoFocus
                            onInput={(e) =>
                                setEmailValue(e.currentTarget.value)
                            }
                            {...inputProps}
                        />
                    )}
                />

                <div className={style.actions}>
                    <button type="submit" disabled={submitting || !formValid}>
                        {submitting ? 'Sending...' : 'Verify'}
                    </button>
                </div>
            </form>

            {!verifyData ? (
                statusText
            ) : (
                <Fragment>

                    <Score data={verifyData}></Score>

                    {/* <GaugeChart data={verifyData}></GaugeChart> */}

                    {/* <DonutChart data={verifyData}></DonutChart> */}


                </Fragment>
            )}

            <Fragment>
                {/* Leave your message and we'll get back to you shortly.
                    You can also read our <RouteLink href='/faq'>FAQ</RouteLink>. */}

                <section className={style.bilicWidgetLinks}>

                <Link className={style.bilicWidgetLink} target="_blank" href="https://airtable.com/shrHjqFa74aFvxJ7A">
                    {/* <img src={SpeakerImage} alt="" /> Report a Wallet */}
                    <img src={SpeakerImage} alt="" /> Report a Case
                </Link>

                <Link className={style.bilicWidgetLink} target="_blank" href="https://docs.google.com/document/d/11ghY9D2j0vA1pGIVFKUigShmSIPdy52y47pZIb5dpes/preview">
                    {/* <img src={SpeakerImage} alt="" /> Report a Wallet */}
                    <img src={SpeakerImage} alt="" /> 
                    Privacy Policy
                </Link>

                    {/* <RouteLink className={style.bilicWidgetLink} href="https://airtable.com/shrHjqFa74aFvxJ7A">
                        <img src={SpeakerImage} alt="" /> Report a Wallet
                    </RouteLink> */}
{/* 
                    <RouteLink className={style.bilicWidgetLink} href="/form">
                        <img src={SpeakerImage} alt="" /> Report a Wallet
                    </RouteLink> */}

                    {/* <Link></Link> */}

                    {/* <RouteLink className={style.bilicWidgetLink} href="/faq">
                        <img src={FaqImage} alt="" />
                        FAQ
                    </RouteLink> */}

                </section>
            </Fragment>
        </div>
    );
};

export default BilicVerify;
