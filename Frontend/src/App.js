import { Register } from "./Register"
import {MainScreen} from "./mainScreen"
import {Login} from "./Login";
import { Route,Routes } from "react-router-dom";

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/home" element={<MainScreen />}/>
      </Routes>
    </div>
  );
}

export default App;