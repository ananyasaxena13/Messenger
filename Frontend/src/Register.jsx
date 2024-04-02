import "./register.css";
import { useState } from "react";
import Axios from "axios";
import { useNavigate,Link} from "react-router-dom";
import logo from "./assests/logo.png";


export const Register = (props) => {
  const Navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/register", { username, email, password })
      .then(response =>{
        if(response.data.status){Navigate("/")}
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
    <div className="navRegister">
        <img src={logo} alt="" />
                <h1>Messenger</h1>
        </div>
    <div className="subMain">
      <div className="register-auth-form-container">
      <div className="salutation">
        <em>Welcome to Messenger!!</em>
        <em>Create your new account</em>
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="registerInput">
          <em>Username</em>
          <input
            type="text"
            id="name"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <em>Email</em>
          <input
            type="email"
            placeholder="youremail@gmail.com"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
          <em>Password</em>
          <input
            type="password"
            placeholder="*"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <span>Already have an account? <Link to="/">Login here</Link></span>
    </div>
    </div>
    </>
  );
};