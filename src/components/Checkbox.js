export default function Checkbox({ className, text, ...rest }) {
    return (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label className={className}>
            <input {...rest} type="checkbox" />
            <span> {text}</span>
        </label>
    );
}
