import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LocationState } from "../@types/location";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useAlert } from 'react-alert'
import { login, register } from "../slices/auth";
import { checkEmail } from "../utils/utils";
import { AuthTypes, AuthValues } from "../@types/auth";

interface IAuthProps {
    header: string;
    type: AuthTypes;
    values: AuthValues;
    setValidEmail: React.Dispatch<React.SetStateAction<boolean>>
    setValidPassword: React.Dispatch<React.SetStateAction<boolean>>
}


export const Auth: React.FC<IAuthProps> = ({ header, type, values, setValidEmail, setValidPassword, children}) => {
    const [isDisabled, setDisabled] = useState<boolean>(true)
    const { authenticated, message, registered } = useAppSelector(state => state.auth);
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

    const checkRegisterButton = () => {
        const isValidE = checkEmail(values.email)
        const isValidP = values.password === values.confirmedPassword
        setDisabled( !isValidP || !isValidE || values.password === "" || values.displayName === "")
        setValidPassword(isValidP)
        setValidEmail(isValidE)
    };

    const handleLoginFormSubmit = async () => {
        dispatch(login(values))
        if (authenticated) {
            // navigate(path.path || "/home/dashboard");
            navigate("/home/dashboard");
        } else {
            await alert.error(message)
        }
    };

    const handleRegisterFormSubmit = async () => {
        dispatch(register(values))
        if (registered) {
            navigate("/login");
        } else {
            await alert.error(message)
        }
    };

    return (
         <div className='h-screen w-full flex justify-center items-center'>
            <div className='w-full max-w-2xl m-auto rounded-lg border border-solid shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium text-primary mt-4 mb-8 text-center'>
                    {header}
                </h1>
                {/* <label>{message}</label> */}
                <div className="max-w-md px-4 mx-auto ">
                    <div>
                        {children}
                        <div className='flex justify-center items-center mt-6'
                            onMouseEnter={() => {type === AuthTypes.Login ? checkLoginButton() : checkRegisterButton()}}
                        >
                            <button onClick={() => {type === AuthTypes.Login ? handleLoginFormSubmit() : handleRegisterFormSubmit()}} disabled={isDisabled} className={`bg-blue py-2 w-full text-sm text-white rounded border border-blue-light focus:outline-none hover:opacity-75`}>
                                {names[type]}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center mt-8 justify-center">
                     <div className={"justify-center text-blue-500 hover:underline"}>
                        {links[type]}
                     </div>
                 </div>
            </div>
        </div>
    );
};