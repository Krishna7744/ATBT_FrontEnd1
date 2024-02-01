import React, {
  createContext,
  useEffect,
  useReducer,
} from "react";
import * as actions from './utils/entitiesActions'
import * as api from './utils/entitiesApis';
import entitiesDataReducer from "./entitiesDataReducer";
import { useNavigate } from "react-router-dom";
import {initialState} from './utils/entitiesConfig'

export const EntitiesDataContext = createContext();

const EntitiesDataProvider = ({ children }) => {
const navigate = useNavigate();

const [entitiesState, entitiesDispatch] = useReducer(
    entitiesDataReducer,
    initialState
);

const getDashboardEntitiesData = async () => {
  const {currentPage,perPage,sortBy,search} = entitiesState.dashboardEntities
  entitiesDispatch(actions.setLoading('DASHBOARD'))
  try {
    const { data } = await api.getEntities(currentPage, perPage, sortBy, search); 
    return entitiesDispatch(actions.setPaginatedEntities('DASHBOARD', data))
  } catch (error) {
    console.error(error);
  } finally {
    entitiesDispatch(actions.setLoading('DASHBOARD'));
  }
};

const getpaginatedEntitiesData = async () => {
  const {currentPage,perPage,sortBy,search} = entitiesState.entitiesList
    entitiesDispatch(actions.setLoading('ENTITES'))
    try {
      const { data } = await api.getEntities(currentPage,perPage,sortBy,search)
      return entitiesDispatch(actions.setPaginatedEntities('ENTITES', data));
    } catch (error) {
      console.error(error);
    } finally {
      entitiesDispatch(actions.setLoading('ENTITES'));
  }
    
};

const deleteEntitybyId = async(id)=> {
      try {
        const data = await api.deleteEntity(id);
        getpaginatedEntitiesData();
        getDashboardEntitiesData();
      } catch (error) {
       console.error(error) 
      }
}

const getEntitybyId = async(id)=> {
      try {
        const entityById = entitiesState?.entities?.find((element) => element.id === id) ?? null
        if(!entityById){
          const data = await api.getEntityById(id)
          getpaginatedEntitiesData();
          getDashboardEntitiesData();
          console.log(data, "id data")
          return data;
        } else {
          return entityById;
        }
      } catch (error) {
       console.error(error) 
      }
}

const createEntity = async(entityData)=>{
      try{
        const {data, status} = await api.createEntity(entityData)
        if (status === 201) {
          getpaginatedEntitiesData();
          getDashboardEntitiesData();
          navigate(`entitylandingpage/${data.Entites.id}`)
        }
      } catch (error) {
        console.error(error) 
      }
}

  useEffect(() => {
    getpaginatedEntitiesData();
    getDashboardEntitiesData();
    // eslint-disable-next-line
  }, [entitiesDispatch,entitiesState?.entitiesList?.currentPage,entitiesState?.entitiesList?.search,entitiesState?.entitiesList?.perPage,entitiesState?.dashboardEntities?.currentPage,entitiesState?.dashboardEntities?.search,entitiesState?.dashboardEntities?.perPage]);

  return (
    <EntitiesDataContext.Provider
      value={{
        entitiesState,
        entitiesDispatch,
        getpaginatedEntitiesData,
        deleteEntitybyId,
        createEntity,
        getEntitybyId
      }}
    >
      {children}
    </EntitiesDataContext.Provider>
  );
};

export default EntitiesDataProvider;