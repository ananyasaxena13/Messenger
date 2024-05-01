import "./App.css";
import { LoginScreen } from "./Login/login";
import { RegisterScreen } from "./Register/register";
import { Home } from "./Home/home";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  const user = localStorage.getItem("User");
  return (
    <>
      <Routes>
        <Route path="/" element={user? <Home />:<Navigate to="/login"/>} />
        <Route path="/login" element={user? <Navigate to="/"/>: <LoginScreen/>} />
        <Route path="/register" element={user? <Navigate to="/"/>: <RegisterScreen />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;