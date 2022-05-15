interface IFormProps {
    name: string;
    type: string;
    placeholder: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: string;
    maxLen? : number;
}


export const Form: React.FC<IFormProps> = ({name, type, placeholder, onChange, value, maxLen, children}) => {
    return (
        <>
            <label htmlFor={name} className="block py-1 dark:text-white">
                {name}
            </label>
            <div className="flex items-center p-2 mb-3 border rounded-md dark:border-white">
                <input
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                id={name}
                className="w-full p-1 outline-none dark:bg-primary dark:text-white" 
                maxLength={maxLen || 35}
                />
                {children}
            </div>
        </>
    );
};