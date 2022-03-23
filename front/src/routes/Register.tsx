import { useState } from 'react';
import { Form } from '../components/Form';
import { AuthTypes } from "../@types/auth";
import { Auth } from "../components/Auth";

const Register: React.FunctionComponent = () => {
    const [values, setValues] = useState({email: "", password: "", confirmedPassword: "", displayName: ""});
    const [isValidEmail, setValidEmail] = useState<boolean>(true)
    const [isValidPassword, setValidPassword] = useState<boolean>(true)
    
    const handleChange = (prop: keyof typeof values, value: string) => {
        setValues({
            ...values,
            [prop]: value
        });
    };
    return (
        <Auth header={"Register a new account"} type={AuthTypes.Register} values={values} setValidEmail={setValidEmail} setValidPassword={setValidPassword}>
            <Form name="Name" type='text' placeholder='Enter name' onChange={(e) => {handleChange('displayName', e.target.value)}} value={values.displayName}/>
            <Form name="Email" type='email' placeholder='name@email.com' onChange={(e) => { handleChange('email', e.target.value); setValidEmail(true); }} value={values.email} />
            {!isValidEmail && (
                <label className='text-red'>
                    Invalid email adress*
                </label>
            ) }
            <Form name="Password" type='password' placeholder='Enter password' onChange={(e) => { handleChange('password', e.target.value)}} value={values.password}/>
            <Form name="Confirm Password" type='password' placeholder='Enter password' onChange={(e) => { handleChange('confirmedPassword', e.target.value); setValidPassword(true)}} value={values.confirmedPassword} />
            {!isValidPassword && (
                <label className='text-red'>
                    Passwords does not match
                </label>
            ) }
        </Auth>
    );
};

export default Register;
