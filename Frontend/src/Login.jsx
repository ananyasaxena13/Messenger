import React, { useState } from "react";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="login-auth-form-container"> 
        <div className="salutation">
            <em>Welcome back!!</em>
            <em>Login to your account</em>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="loginInput">
                <em>Email</em>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
                <em>Password</em>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*" id="password" name="password"/>
            </div>
            <button type="submit">Log In</button>
        </form>
        <span>Already have an account? <a href="" onClick={() => props.onFormSwitch('login')}>Login here</a></span>
    </div>
    );
}
