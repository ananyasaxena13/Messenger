import React, { useState } from "react";

export const Login = (props) => {

    const Navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    Axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3000/", { email, password })
      .then(response =>{
        if(response.data.status){Navigate("/home")}
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
        </div>
        </>
    );
}