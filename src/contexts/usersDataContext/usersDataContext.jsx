import React, {
  createContext,
  useEffect,
  useReducer,
  useContext
} from "react";
import * as actions from './utils/usersActions'
import * as api from './utils/usersApis'
import userDataReducer from "./userDataReducer";
import { initialState } from "./utils/usersConfig";
import { AuthContext } from "../authContext/authContext";
import { useNavigate } from "react-router-dom";

export const UserDataContext = createContext();

const localStorageData = JSON.parse(localStorage.getItem("data"));

const UserDataProvider = ({ children }) => {
  const navigate = useNavigate();
  const [usersState, usersDispatch] = useReducer(
    userDataReducer,
    initialState
  );


  const { authState } = useContext(AuthContext);

  const getAllUsers = async () => {
    const { status, data } = await api.getAllUsers();
    if (status === 200) {
      usersDispatch(actions.setUsersData(data))
    }
  }

  const getDashboardUsersData = async () => {
    const {currentPage,pageSize,sortBy,search} = usersState.dashboard;
    usersDispatch(actions.setLoading("DASHBOARD"))
    try {
      const { status, data } = await api.getDashboardUsers(currentPage,pageSize,sortBy,search)
      if (status === 200) {
        usersDispatch(actions.setDashboardUsers(data,'DASHBOARD'))
      }
    } catch (error) {
      console.error(error);
    } finally {
      usersDispatch(actions.setLoading("DASHBOARD"))
    }
  };

  const getSettingsUsersData = async () => {
    const {currentPage,pageSize,sortBy,search} = usersState.settings;
    usersDispatch(actions.setLoading("SETTINGS"))
    try {
      const { status, data } = await api.getSettingsUsers(currentPage,pageSize,sortBy,search)
      if (status === 200) {
        usersDispatch(actions.setDashboardUsers(data,'SETTINGS'))
      }
    } catch (error) {
      console.error(error);
    } finally {
      usersDispatch(actions.setLoading("SETTINGS"))
    }
  };

  const getUser = async (userID) => {
    try {
      const { status, data } = await api.getUserById(userID);
      if (status === 200) {
        return data;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const createUser = async (userData) => {
    try {
      console.log("navig")
      const { data, status } = await api.createUser(userData, authState.token)
      console.log(data, status, "navig")
      getDashboardUsersData()
      getSettingsUsersData()
      getAllUsers()
      if (status === 200) {
        getDashboardUsersData()
        getSettingsUsersData()
        getAllUsers()
        navigate(`/`)
      }
    }
    catch (e) {
      console.error(e);
    }
  };

  const deleteUser = async(id) => {
    try {
      console.log(localStorageData?.token)
      const { data, status } = await api.deleteUser(id, authState.token)
      if (status === 200) {
        getDashboardUsersData()
        getSettingsUsersData()
        getAllUsers()
      }
    }
    catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getDashboardUsersData();
    getSettingsUsersData();
    // eslint-disable-next-line
  }, [usersDispatch,usersState?.dashboard?.currentPage,usersState?.dashboard?.search,usersState?.dashboard?.pageSize,usersState?.settings?.sortBy,usersState?.settings?.currentPage,usersState?.settings?.search,usersState?.settings?.pageSize,usersState?.settings?.sortBy]);
  useEffect(() => {
    getAllUsers()
    getSettingsUsersData();
    // eslint-disable-next-line
  }, []);

  return (
    <UserDataContext.Provider
      value={{
        usersState,
        usersDispatch,
        createUser,
        getUser,
        getDashboardUsersData,
        getSettingsUsersData,
        deleteUser,
        setSortBy: actions.setSortBy,
        toggleUser: api.toggleUser
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;