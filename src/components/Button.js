import classes from '../styles/Button.module.css';

export default function Button({ className, children, ...rest }) {
    // eslint-disable-next-line react/button-has-type
    return (
        // eslint-disable-next-line react/button-has-type
        <button className={`${classes.button} ${className}`} {...rest}>
            {children}
        </button>
    );
}
