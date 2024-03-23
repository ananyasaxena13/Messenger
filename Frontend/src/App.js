import { Register } from "./Register"
import {MainScreen} from "./mainScreen"
import { Route,Routes } from "react-router-dom";

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/mainScreen" element={<MainScreen />}/>
      </Routes>
    </div>
  );
}

export default App;
