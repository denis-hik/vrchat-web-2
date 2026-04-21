type TSupportFieldProps = {
    label: string,
    value: string,
    onChange: (value: string) => void,
    placeholder: string,
    textarea?: boolean
}

export const SupportField = ({
    label,
    value,
    onChange,
    placeholder,
    textarea
}: TSupportFieldProps) => {
    return (
        <label className={"support-field"}>
            <span>{label}</span>
            {textarea ? (
                <textarea
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={placeholder}
                />
            ) : (
                <input
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder={placeholder}
                />
            )}
        </label>
    );
};
