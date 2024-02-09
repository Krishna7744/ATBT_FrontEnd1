import React, { createContext, useEffect, useReducer } from "react";
import authReducer from "../../reducers/authReducer";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import { apiUrl } from "../../utils/constants";
import { setupAuthenticationErrorHandler } from "./utils/setupAthenticationErrorHandler";

export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const localStorageData = JSON.parse(localStorage.getItem("data"));

  const initialAuth = {
    user: localStorageData?.user || {},
    token: localStorageData?.token || "",
  };

  const [authState, authDispatch] = useReducer(authReducer, initialAuth);
  const adminLogin = async (loginData) => {
    try {
      let status, data;
      if (loginData.email === "admin@atbt.com") {
        ({ status, data } = await toast.promise(
          axios.post(`${apiUrl}/auth/su-login`, loginData),
          {
            pending: 'Logging In...',
            success: {
              render({ data: { data: { user: { userName } } } }) {
                return `Welcome ${userName}`;
              }
            },
            error: 'Wrong Credentials 🤯',
          },
        ));
      } else {
        ({ status, data } = await toast.promise(
          axios.post(`${apiUrl}/auth/login`, loginData),
          {
            pending: 'Logging In...',
            success: {
              render({ data: { data: { user: { userName } } } }) {
                return `Welcome ${userName}`;
              }
            },
            error: 'Wrong Credentials 🤯',
          },
        ));
      }
  
      if (status === 200) {
        localStorage.setItem(
          "data",
          JSON.stringify({ user: data?.user, token: data?.token })
        );
        authDispatch({ type: "SET_USER", payload: data?.adminData });
        authDispatch({ type: "SET_TOKEN", payload: data?.token });
        navigate(location?.state?.from?.pathname || "/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const changePassword = async ({ email }) => {
    try {
      const { status } = await toast.promise(
        axios.put(`${apiUrl}/user/forgotpassword?email=${email}`),
        {
          pending: 'verifying email',
          success: {
            render({ data: { data: { message } } }) {
              return `${message}`
            }
          },
          error: 'invalid email 🤯',
        },
      )
      if (status === 200) {
        navigate("/login");
        Swal.fire({
          title: "Reset Password Success!",
          text: "Check your email for reset instructions.",
          icon: "success"
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const resetPassword = async ({ id, password }) => {
    try {
      const { data, status } = await toast.promise(
        axios.put(`${apiUrl}/user/changepassword/${id}`, {newPassword:password}),
        {
          pending: 'verifying data',
          success: {
            render({ data: { data: { updated } } }) {
              return `Password Updated`
            }
          },
          error: 'Unauthorized Access 🤯',
        },
      )
      console.log(status, "status")
      if(status === 200) {
        navigate("/login");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const userLogout = () => {
    localStorage.removeItem("data");
    authDispatch({ type: "SET_USER", payload: {} });
    authDispatch({ type: "SET_TOKEN", payload: "" });
    navigate("/");
  };

  useEffect(() => {
    if (localStorageData) {
      authDispatch({ type: "SET_USER", payload: localStorageData?.user });
      authDispatch({ type: "SET_TOKEN", payload: localStorageData?.token });
      setupAuthenticationErrorHandler(userLogout,navigate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ authState, adminLogin, changePassword, resetPassword, userLogout, localStorageData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;