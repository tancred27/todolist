import React, { useState, useContext, useEffect } from 'react';
import authContext from '../../context/auth/authContext';
import signin from "../../images/signin.svg";
import "./auth.styles.css";

const Login = (props) => {

    const AuthContext = useContext(authContext);
    
    const { login, isAuthenticated } = AuthContext;

    useEffect(() => {
        if(isAuthenticated){
            props.history.push('/');
        }
        // eslint-disable-next-line
    }, [isAuthenticated, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });
 
    const { email, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        login({
            email,
            password
        });
    };

    const toRegister = () => {
        window.location.href="/register";
    }

    return (
        <div className="login-container">
            <div className="forms-container">
                <form onSubmit={onSubmit} className="login-form">
                    <h2 className="title">Login</h2>
                    <div className="input-field">
                        <i class="fa fa-envelope prefix grey-text"></i>
                        <input placeholder="Your Email" type="email" name="email" onChange={onChange} value={email} required />
                    </div>
                    <div className="input-field">
                        <i class="fa fa-lock prefix grey-text"></i>
                        <input placeholder="Your Password" type="password" name="password" value={password} onChange={onChange} required />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
            <div className="panels-container">
                <div className="panels left-panel">
                    <div className="content">
                        <h3>New Here ?</h3>
                        <p>Register an account so you can maintain a to-do list of all your chores so you don't forget anything!</p>
                        <button className="login-button transparent" onClick={toRegister} >Register</button>
                    </div>
                    <img src={signin} className="login-image" alt="login" />
                </div>
            </div>
        </div>
    );
};

export default Login;
