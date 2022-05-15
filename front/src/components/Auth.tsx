import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LocationState } from "../@types/location";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useAlert } from 'react-alert'
import { login, password, register } from "../slices/auth";
import { checkEmail } from "../utils/Utils";
import { AuthTypes, AuthValues } from "../@types/auth";
import { Alert } from "./Alert";
import { useDispatch } from "react-redux";
import { RootState, useSelector } from "../store/storee";

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
    const { authenticated, message, registered, reset } =  useAppSelector((state) => state.auth);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const location = useLocation();
    const path = location.state as LocationState
    const names = ['Login', 'Register', 'Reset Password']
    const links = [ <Link to="/register">Need to register? Sign up for free</Link>, <Link to="/login">Already registered ? Log in here</Link>, <Link to="/login">Go back to login</Link>]
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const alert = useAlert()
    
    const checkButton = async (callback: string) => {
        const callbackList: {[key: string]: Function} = {
            'Login':  function checkLogin() {
                const isValid = checkEmail(values.email)    
                setDisabled(values.password === "" || !isValid)
                setValidEmail(isValid)
            },
            'Register': function checkRegister() {
                const isValidE = checkEmail(values.email)
                const isValidP = values.password === values.confirmedPassword
                setDisabled( !isValidP || !isValidE || values.password === "" || values.displayName === "")
                setValidPassword(isValidP)
                setValidEmail(isValidE)
            },
            'Reset Password': function checkPassword() {
                const isValid = checkEmail(values.email)
                setDisabled(!isValid)
                setValidEmail(isValid)
            }
        };
        await callbackList[callback]();
    };
      
    const handleFormSubmit = async (callback: string) => {
        const callbackList: {[key: string]: Function} = {
            'Login': () => {
                dispatch(login(values))
                if (authenticated) {
                    navigate("/home/dashboard");
                } else {
                    setColor('bg-red');
                    setShowAlert(true);
                }
            },
            'Register': function registerUser() {
                dispatch(register(values))
                if (registered) {
                    navigate("/login");
                } else {
                    setColor('bg-red');
                    setShowAlert(true);
                }
            },
            'Reset Password': function resetPassword() {
                dispatch(password({email: values.email}))
                if (reset) {
                    setColor('bg-green');
                } else {
                    setColor('bg-red');
                    setShowAlert(true);
                }
            }
        };
        await callbackList[callback]();
    };

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
                        onMouseEnter={() => checkButton(names[type])}
                    >
                        <button onClick={() => handleFormSubmit(names[type])} disabled={isDisabled} className={`bg-blue py-2 w-full text-sm text-white rounded border border-blue-light focus:outline-none hover:opacity-75`}>
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



