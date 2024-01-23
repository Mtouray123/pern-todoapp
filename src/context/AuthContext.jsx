import { useState, useEffect, createContext } from "react";
import jwtDecode from 'jwt-decode';
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ userId: 0, userName: "" });
  const [auth, setAuth] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const checkTokenExpired = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode = jwtDecode(token);
      const currentDate = new Date();
      if (decode.exp * 1000 < currentDate.getTime()) {
        localStorage.removeItem("token");
        setAuth(false);
        navigate("/");
      }
    }
  };

  const isLogged = () => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        setAuth(true);
        const decode = jwtDecode(token);
        setUser({ userId: decode.user.id, userName: decode.user.userName });
      } else {
        localStorage.removeItem("token");
        setAuth(false);
        setUser({ userId: 0, userName: "" });
      }
    } catch (error) {
      localStorage.removeItem("token");
      setAuth(false);
      setUser({ userId: 0, userName: "" });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    navigate("/");
  };

  useEffect(() => {
    isLogged();
    checkTokenExpired();
  }, [auth]);

  const contextValues = {
    setAuth,
    auth,
    logout,
    user,
  };

  return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>;
};

export default AuthContext;
