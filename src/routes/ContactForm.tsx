import { h, Fragment } from 'preact';
import { useContext, useState, useMemo, useEffect } from 'preact/hooks';
import style from './contactForm.css';
import { ConfigContext, ServiceContext } from '../AppContext';
import Field from '../components/Field';
import { useIsMounted } from '../hooks';
import { RouteLink, RouterContext } from '../layout/Router';

const ContactForm = () => {
    const config = useContext(ConfigContext);
    const service = useContext(ServiceContext);
    const router = useContext(RouterContext);
    const mounted = useIsMounted();

    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState('');

    const [emailValue, setEmailValue] = useState('');
    const emailError = useMemo(
        () => mounted.current && (!emailValue || !(/^\S+@\S+$/.test(emailValue)))
            ? 'Email is required and must be valid' : '',
        [emailValue, submitting, mounted]);

    const [messageValue, setMessageValue] = useState('');
    const messageError = useMemo(
        () => mounted.current && (!messageValue || messageValue.length < 5)
            ? 'Text is required and must contain at least 5 characters' : '',
        [messageValue, submitting, mounted]);

    const formValid = useMemo(
        () => ![emailError, messageError].reduce((m, n) => m + n),
        [emailError, messageError]);

    useEffect(() => {
        if (!submitting) {
            return;
        }
        setServerError(''); // reset previous server error
        if (!formValid) {
            setSubmitting(false);
            return;
        }

        console.log('Sending form', { emailValue, messageValue });
        service?.sendForm({ email: emailValue, message: messageValue })
            .then(() => {
                router.setRoute('/thankyou');
            })
            .catch(() => {
                setServerError(`Something went wrong and we couldn't send your form. Please try again later.`);
            })
            .then(() => setSubmitting(false));
    }, [formValid, submitting, emailValue, messageValue, service]);

    return (
        <div>
            <p>{config.text.formSubTitle ??
                <Fragment>
                    Leave your message and we'll get back to you shortly.
                    You can also read our <RouteLink href='/faq'>FAQ</RouteLink>.</Fragment>}</p>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitting(true);
                }}>
                {serverError && <div className={style.error}>{serverError}</div>}
                <Field
                    name='email'
                    title='Email'
                    error={emailError}
                    render={(inputProps) => (
                        <input
                            type='text'
                            inputMode='email'
                            disabled={submitting}
                            placeholder='me@home.com'
                            autoFocus
                            onInput={(e) => setEmailValue(e.currentTarget.value)}
                            {...inputProps}
                        />)} />
                <Field
                    name='message'
                    title='Message'
                    error={messageError}
                    render={(inputProps) => (
                        <textarea
                            rows={7}
                            disabled={submitting}
                            autoComplete='disable'
                            onInput={(e) => setMessageValue(e.currentTarget.value)}
                            {...inputProps}
                        />)} />

                <div className={style.actions}>
                    <button type='submit' disabled={submitting || !formValid}>
                        {submitting ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </form>
        </div >);
};

export default ContactForm;
