import { useEffect, useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { logout } from "../slices/auth";
import { Form } from '../components/Form';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Auth } from '../components/Auth';
import { AuthTypes } from '../@types/auth';
import { Link } from 'react-router-dom';

const Login: React.FunctionComponent = () => {

    const [values, setValues] = useState({email: "", password: ""});
    const [isValidEmail, setValidEmail] = useState<boolean>(true)
    const [visible, setVisible] = useState<boolean>(false)
    const { authenticated, message } = useAppSelector(state => state.auth);

    const dispatch = useAppDispatch();
    
    useEffect(() => {
        if (authenticated)
            dispatch(logout());
      }, []); 

    const handleChange = (prop: keyof typeof values, value: string) => {
        setValues({
            ...values,
            [prop]: value
        });
    };
    return (
        <>
            <Auth header={"Log in to your account"} type={AuthTypes.Login} values={values} setValidEmail={setValidEmail} setValidPassword={setValidEmail}>
                <Form name="Email" type='email' placeholder='name@email.com' onChange={(e) => { handleChange("email", e.target.value); setValidEmail(true); }} value={values.email}/>
                {!isValidEmail && (
                    <label className='text-red'>
                        Invalid email adress*
                    </label>
                ) }
                <Form name="Password" type={visible ? 'text' : 'password'} placeholder='Enter password' onChange={(e) => { handleChange("password", e.target.value)}} value={values.password}>
                    <button className="hover:opacity-75" onClick={() => {setVisible(!visible)}}>
                        {visible ? 
                            <AiFillEyeInvisible color='#0AC5CD' size={24}/>
                            
                            : 
                            <AiFillEye color='#0AC5CD' size={24}/>
                        }
                    </button>
                </Form>
                <section className="text-right text-brown text-base">
                    <Link to="/password">Forgot your password ?</Link>
                </section>
            </Auth>
        </>
    );
};

export default Login;