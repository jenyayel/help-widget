import { h, ComponentChildren } from 'preact';
import style from './field.css';
import clsx from 'clsx';

interface InputProps {
    name: string;
}

interface OwnProps {
    name: string;
    title?: string;
    error?: string;
    render: (props: InputProps) => ComponentChildren;
}

export default ({ name, title, render, error }: OwnProps) => (
    <div className={clsx(style.root, { [style.error]: error })}>
        {title && <label for={name}>{title}</label>}
        {render({ name })}
        {error && <span>{error}</span>}
    </div >);
