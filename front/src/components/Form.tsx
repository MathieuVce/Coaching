interface IFormProps {
    name: string;
    type: string;
    placeholder: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}


export const Form: React.FC<IFormProps> = ({name, type, placeholder, onChange, value, onMouseEnter, onMouseLeave, children}) => {
    return (
        <>
        <label htmlFor={name} className="block py-1 text-gray-500">
            {name}
        </label>
        <div className="flex items-center p-2 mb-3 border rounded-md"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <input
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            id={name}
            className="w-full p-1 text-gray-500 outline-none bg-transparent" />
            {children}
        </div>
        </>
    );
};