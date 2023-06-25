import './Register.css';
import {SyntheticEvent, useEffect, useState} from "react";
import axios, { AxiosError } from "axios";
import { Navigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [errorText, setErrorText] = useState('');


    useEffect(() => {
        if (redirect) {
            // Perform the page refresh here
            window.location.reload();
        }
    }, [redirect]);
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const data = {
            email: email,
            password: pass
        };

        try {
             const loginResponse = await axios.post('http://localhost:3000/auth/login', data, { withCredentials: true });

            if (loginResponse.status === 201) {
                setRedirect(true);
                localStorage.setItem('hasCookie', 'true');

            }
        } catch (error) {
            if ((error as AxiosError).response?.status != 201) {
                setErrorText('Invalid email or password');
            }
        }
    };

    if (redirect) {
        return <Navigate to='/' />;
    }

    return (
        <>
            <main className="form-signin w-100 m-auto">
                <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal">Please Login</h1>
                    <div className="form-floating" >
                        <input type="email" className="form-control" id="floatingInput"
                               placeholder="name@example.com"
                               onChange={(e) => setEmail(e.target.value)} required />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                               onChange={(e) => setPass(e.target.value)} required/>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Login</button>
                    <h6 className="error">{errorText}</h6>
                </form>
            </main>
        </>
    );
};

export default Login;