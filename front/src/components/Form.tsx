interface IFormProps {
    name: string;
    type: string;
    placeholder: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
}


export const Form: React.FC<IFormProps> = ({name, type, placeholder, onChange, value, children}) => {
    return (
        <>
            <label htmlFor={name} className="block py-1">
                {name}
            </label>
            <div className="flex items-center p-2 mb-3 border rounded-md">
                <input
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                id={name}
                className="w-full p-1 outline-none bg-transparent" />
                {children}
            </div>
        </>
    );
};