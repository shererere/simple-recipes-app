import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

type ButtonType = 'button' | 'submit' | 'reset';

const Button = ({
    onClick = () => {},
    danger = false,
    primary = false,
    secondary = !primary,
    type = 'button',
    children,
}) => (
    <button
        type={ type as ButtonType }
        onClick={ onClick }
        className={ clsx(
            styles.button,
            danger && styles.danger,
            primary && styles.primary,
            secondary && styles.secondary,
        ) }
    >
        { children }
    </button>
);

export default Button;