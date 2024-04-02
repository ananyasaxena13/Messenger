import { Link } from "react-router-dom";
import './register.css';
import logo from "./assests/logo.png";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="register-auth-form-container">
            <div className="salutation">
                <em>Welcome to Messenger!!</em>
                <em>Create your new account</em>
            </div>
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="registerInput">
                    <em>Full Name</em>
                    <input value={name} name="name" type="text" id="name" placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
                    <em>Email</em>
                    <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>
                    <em>Password</em>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*" id="password" name="password"/>
                </div>
                <button type="submit">Register</button>
            </form>
            <span>Already have an account? <a href="" onClick={() => props.onFormSwitch('login')}>Login here</a></span>
        </div>
    );
}
