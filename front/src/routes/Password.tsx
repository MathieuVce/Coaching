import { useState } from 'react';
import { Form } from '../components/Form';
import { Auth } from '../components/Auth';
import { AuthTypes } from '../@types/auth';

const Password: React.FunctionComponent = () => {

    const [values, setValues] = useState({email: "", password: ""});
    const [isValidEmail, setValidEmail] = useState<boolean>(true)

    const handleChange = (prop: keyof typeof values, value: string) => {
        setValues({
            ...values,
            [prop]: value
        });
    };
    return (
        <Auth header={"Reset your password"} type={AuthTypes.Password} values={values} setValidEmail={setValidEmail} setValidPassword={setValidEmail}>
            <Form name="Email" type='email' placeholder='name@email.com' onChange={(e) => { handleChange("email", e.target.value); setValidEmail(true); }} value={values.email}/>
            {!isValidEmail && (
                <label className='text-red'>
                    Invalid email adress*
                </label>
            ) }
        </Auth>
    );
};

export default Password;