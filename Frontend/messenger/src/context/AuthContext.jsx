import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  // Check if localStorage item "User" exists and is valid JSON
  const storedUser = localStorage.getItem("User");
  console.log(storedUser);
  const initialAuthUser = storedUser ? JSON.parse(storedUser) : null;
  console.log(initialAuthUser);

  const [authUser, setAuthUser] = useState(initialAuthUser);

  // Function to update authUser in localStorage and context
  const updateAuthUser = (user) => {
    localStorage.setItem("User", JSON.stringify(user));
    setAuthUser(user);
  };

  return (
    <AuthContext.Provider value={{ authUser, updateAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
