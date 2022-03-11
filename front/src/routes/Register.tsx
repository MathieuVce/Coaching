import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { register } from "../slices/auth";
import { Form } from '../components/Form';
import { RootState, useSelector } from '../store/storee';

const Register: React.FunctionComponent = () => {
    const [values, setValues] = useState({email: "", password: "", confirmedPassword: "", displayName: ""});
    const [isValidEmail, setValidEmail] = useState<boolean>(true)
    const [isValidPassword, setValidPassword] = useState<boolean>(true)
    const [isDisabled, setDisabled] = useState<boolean>(true)
    const { registered } = useSelector((state: RootState) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const checkEmail = () => {
        const valid = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(values.email)
        setValidEmail(valid)
        checkButton()
        return (valid)
    };
    const checkPassword = () => {
        setValidPassword(values.password === values.confirmedPassword)
    };

    const checkButton = () => {
        setDisabled(values.password !== values.confirmedPassword || !isValidEmail || values.password === "" || values.displayName === "")
    };

    const handleFormSubmit = async () => {
        checkEmail()
        console.log(values);
        dispatch(register(values))
        if (registered) {
            setValues({email: "", password: "", confirmedPassword: "", displayName: ""});
            navigate("/login");
        } else {
            
        }
    };

    return (
         <div className='h-screen w-full flex justify-center items-center'>
            <div className='w-full max-w-2xl m-auto rounded-lg border border-solid shadow-default py-10 px-16'>
                <h1 className='text-xl font-medium text-primary mt-4 mb-8 text-center'>
                    Register a new account
                </h1>
                <div className="max-w-md px-4 mx-auto ">
                    <div>
                        <Form name="Name" type='text' placeholder='Enter name' onChange={(e: { target: { value: any; }; }) => { setValues({ ...values, displayName: e.target.value });}} value={values.displayName}/>
                        <Form name="Email" type='email' placeholder='name@email.com' onChange={(e: { target: { value: any; }; }) => { setValues({ ...values, email: e.target.value }); setValidEmail(true); }} value={values.email} onMouseEnter={() => setValidEmail(true)} onMouseLeave={() => checkButton()}/>
                        {!isValidEmail && (
                            <label className='text-red'>
                                Invalid email adress*
                            </label>
                        ) }
                        <Form name="Password" type='password' placeholder='Enter password' onChange={(e: { target: { value: any; }; }) => { setValues({ ...values, password: e.target.value })}} value={values.password} onMouseLeave={() => checkButton()}/>
                        <Form name="Confirm Password" type='password' placeholder='Enter password' onChange={(e: { target: { value: any; }; }) => { setValues({ ...values, confirmedPassword: e.target.value })}} value={values.confirmedPassword} onMouseEnter={() => setValidPassword(true)} onMouseLeave={() => checkButton()}/>
                        {!isValidPassword && (
                            <label className='text-red'>
                                Passwords does not match
                            </label>
                        ) }
                        <div className='flex justify-center items-center mt-6'
                        onMouseEnter={() => {checkEmail(); checkPassword(); checkButton()}}
                        >
                            <button onClick={handleFormSubmit} disabled={isDisabled} className={`bg-blue py-2 px-8 text-sm text-white rounded border border-blue-light focus:outline-none hover:opacity-75`}>
                                Register
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center mt-8 justify-center">
                     <div className={"justify-center text-blue-500 hover:underline"}>
                        <Link to="/login">Already registered ? Log in here</Link>
                     </div>
                 </div>
            </div>
        </div>
    );
};

export default Register;
