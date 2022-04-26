import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LocationState } from "../@types/location";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useAlert } from 'react-alert'
import { login, password, register } from "../slices/auth";
import { checkEmail } from "../utils/Utils";
import { AuthTypes, AuthValues } from "../@types/auth";
import { Alert } from "./Alert";

interface IAuthProps {
    header: string;
    type: AuthTypes;
    values: AuthValues;
    setValidEmail: React.Dispatch<React.SetStateAction<boolean>>
    setValidPassword: React.Dispatch<React.SetStateAction<boolean>>
}


export const Auth: React.FC<IAuthProps> = ({ header, type, values, setValidEmail, setValidPassword, children}) => {
    const [isDisabled, setDisabled] = useState<boolean>(false)
    const [color, setColor] = useState<string>('red')
    const { authenticated, message, registered, reset } = useAppSelector(state => state.auth);
    const [showAlert, setShowAlert] = useState<boolean>(false);
   
    const location = useLocation();
    const path = location.state as LocationState
    const names = ['Login', 'Register', 'Reset Password']
    const links = [ <Link to="/register">Need to register? Sign up for free</Link>, <Link to="/login">Already registered ? Log in here</Link>, <Link to="/login">Go back to login</Link>]
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const alert = useAlert()
    
    const checkLoginButton = () => {
        const isValid = checkEmail(values.email)
        setDisabled(values.password === "" || !isValid)
        setValidEmail(isValid)
    };
    
    const checkPasswordButton = () => {
        const isValid = checkEmail(values.email)
        setDisabled(!isValid)
        setValidEmail(isValid)
    };

    const checkRegisterButton = () => {
        const isValidE = checkEmail(values.email)
        const isValidP = values.password === values.confirmedPassword
        setDisabled( !isValidP || !isValidE || values.password === "" || values.displayName === "")
        setValidPassword(isValidP)
        setValidEmail(isValidE)
    };

    const handleLoginFormSubmit = async () => {
        await dispatch(login(values))
        if (authenticated) {
            // navigate(path.path || "/home/dashboard");
            navigate("/home/dashboard");
        } else {
            // await alert.error(message)
            setColor('bg-red');
            setShowAlert(true);
        }
    };

    const handleRegisterFormSubmit = async () => {
        await dispatch(register(values))
        if (registered) {
            navigate("/login");
        } else {
            // await alert.error(message)
            setColor('bg-red');
            setShowAlert(true);
        }
    };

    const handlePasswordFormSubmit = async () => {
        await dispatch(password({email: values.email}))
        if (reset) {
            setColor('bg-green');
        } else {
            setColor('bg-red')
        }
        setShowAlert(true);
    };
    const buttons = [checkLoginButton, checkRegisterButton, checkPasswordButton]
    const form = [handleLoginFormSubmit, handleRegisterFormSubmit, handlePasswordFormSubmit]


    return (
         <div className='h-screen w-full flex justify-center items-center flex-col dark:bg-primary'>
            <Alert color={color} message={message} setShowAlert={setShowAlert} showAlert={showAlert}/>
            <div className='w-full max-w-2xl m-auto rounded-lg border border-solid dark:border-white dark:shadow-white shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium text-primary dark:text-white mt-4 mb-8 text-center'>
                    {header}
                </h1>
                <section className="max-w-md px-4 mx-auto">
                    {children}
                    <article className='flex justify-center items-center mt-6'
                        onMouseEnter={buttons[type]}
                    >
                        <button onClick={form[type]} disabled={isDisabled} className={`bg-blue py-2 w-full text-sm text-white rounded border border-blue-light focus:outline-none hover:opacity-75`}>
                            {names[type]}
                        </button>
                    </article>
                </section>
                <section className="flex items-center mt-8 justify-center">
                     <article className={"justify-center text-blue-500 hover:underline dark:text-white"}>
                        {links[type]}
                     </article>
                </section>
            </div>
        </div>
    );
};



