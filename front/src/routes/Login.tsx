import { useEffect, useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert'
import { login, logout } from "../slices/auth";
import { RootState } from '../store/storee';
import { useNavigate } from "react-router-dom";

const Login: React.FunctionComponent = () => {

    const [values, setValues] = useState({email: "", password: ""});
    const [isValidEmail, setValidEmail] = useState<boolean>(true)
    const [visible, setVisible] = useState<boolean>(false)
    const [isDisabled, setDisabled] = useState<boolean>(true)
    const { authenticated, user } = useSelector((state: RootState) => state.auth);
    const { state } = useLocation();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert()
    
    useEffect(() => {
        if (authenticated)
            dispatch(logout());
      }, []);

    const checkEmail = () => {
        const valid = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(values.email)
        setValidEmail(valid)
        checkButton()
        return (valid)
    };

    const checkButton = () => {
        setDisabled(values.password === "" || !isValidEmail)
    };

    const handleFormSubmit = async () => {
        checkEmail()
        console.log(values);
        dispatch(login(values))
        if (authenticated) {
            setValues({email: "", password: ""});
            navigate(state?.path || "/dashboard");
        } else {
            // alert.error(
            //     <label className='text-blue'>Wrong credentials</label>
            // )
        }
    };

    return (
         <div className='h-screen w-full flex justify-center items-center'>
            <div className='w-full max-w-lg m-auto rounded-lg border border-solid shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium text-primary mt-4 mb-8 text-center'>
                    Log in to your account
                </h1>
                <div className="max-w-md px-4 mx-auto ">
                    <div>
                        <label htmlFor="email" className="block py-1 text-gray-500">
                            Email
                        </label>
                        <div className="flex items-center p-2 border rounded-md"
                            onMouseEnter={() => setValidEmail(true)}
                            onMouseLeave={() => checkEmail()}
                        >
                            <input
                                value={values.email}
                                onChange={e => {setValues({...values, email: e.target.value}); setValidEmail(true)}}
                                type="email"
                                placeholder="name@email.com"
                                id="email"
                                className="w-full p-1 text-gray-500 outline-none bg-transparent"
                            />
                        </div>
                        {!isValidEmail && (
                            <label className='text-red'>
                                Invalid email adress*
                            </label>
                        ) }
                        <label htmlFor='password' className="block pb-1 pt-6">Password</label>
                        <div className="flex items-center text-gray-400 border rounded-md"
                            onMouseEnter={() => checkEmail()}
                            onMouseLeave={() => checkButton()}
                        >
                            <input 
                                value={values.password}
                                onChange={e => setValues({...values, password: e.target.value})}
                                type={visible ? "text" : "password"}
                                placeholder="Enter password"
                                id="password"
                                className="w-full p-2.5  bg-transparent outline-none"
                            />
                            <button className="pr-2 hover:opacity-75" onClick={() => {setVisible(!visible)}}>
                                {visible ? 
                                    <AiFillEyeInvisible color='#0AC5CD' size={24}/>

                                : 
                                    <AiFillEye color='#0AC5CD' size={24}/>
                                }
                            </button>
                        </div>
                        <div className='flex justify-center items-center mt-6'>
                            <button onClick={handleFormSubmit} disabled={isDisabled} className={`bg-blue py-2 px-8 text-sm text-white rounded border border-blue-light focus:outline-none hover:opacity-75`}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center mt-8 justify-center">
                     <div className={"justify-center text-blue-500 hover:underline"}>
                        <Link to="/register">Need to register? Sign up for free</Link>
                     </div>
                 </div>
            </div>
        </div>
    );
};

export default Login;