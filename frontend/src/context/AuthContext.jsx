import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  loginUser,
  registerUser,
} from "../api/authApi";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(
      JSON.parse(
        localStorage.getItem("user")
      ) || null
    );

  const register = async (
    userData
  ) => {
    const data =
      await registerUser(userData);

    localStorage.setItem(
      "user",
      JSON.stringify(data)
    );

    setUser(data);
  };

  const login = async (
    userData
  ) => {
    const data =
      await loginUser(userData);

    localStorage.setItem(
      "user",
      JSON.stringify(data)
    );

    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem(
      "user"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);