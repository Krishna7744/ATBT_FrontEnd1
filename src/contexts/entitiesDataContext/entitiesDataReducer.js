import * as actionTypes from './utils/entitiesActionTypes'
const entitiesDataReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_ENTITIES:
            return {
                ...state,
                entities: { ...action?.payload }
            }
        case actionTypes.SET_PAGINATED_ENTITIES:
            const reducerData = action.payload.data;
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboardEntities: {
                    ...state.dashboardEntities,
                    paginatedEntities: reducerData.Entites,
                    totalPages: reducerData.totalPages,
                    totalEntities: reducerData.totalEntities,
                    startEntity: reducerData.startEntity,
                    endEntity: reducerData.endEntity,
                    currentPage: reducerData.currentPage
                },
            } : {
                ...state,
                entitiesList: {
                    ...state.entitiesList,
                    paginatedEntities: reducerData.Entites,
                    totalPages: reducerData.totalPages,
                    totalEntities: reducerData.totalEntities,
                    startEntity: reducerData.startEntity,
                    endEntity: reducerData.endEntity,
                    currentPage: reducerData.currentPage

                },
            }

        case actionTypes.SET_SEARCH:
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboardEntities: {
                    ...state.dashboardEntities,
                    search: action.payload.data,
                    currentPage: 1,
                },
            } : {
                ...state,
                entitiesList: {
                    ...state.entitiesList,
                    search: action.payload.data,
                    currentPage: 1,
                },
            }

        case actionTypes.SET_PER_PAGE:
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboardEntities: {
                    ...state.dashboardEntities,
                    perPage: action.payload.data
                },
            } : {
                ...state,
                entitiesList: {
                    ...state.entitiesList,
                    perPage: action.payload.data
                },
            }

        case actionTypes.SET_CUSTOM_PAGE:
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboardEntities: {
                    ...state.dashboardEntities,
                    currentPage: action.payload.data
                }
            } : {
                ...state,
                entitiesList: {
                    ...state.entitiesList,
                    currentPage: action.payload.data
                }
            }

        case actionTypes.SET_LOADING:
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboardEntities: {
                    ...state.dashboardEntities,
                    loading: !state.dashboardEntities.loading
                }
            } : {
                ...state,
                entitiesList: {
                    ...state.entitiesList,
                    loading: !state.entitiesList.loading
                }
            }


        default:
            return state;
    }
}

export default entitiesDataReducer;
