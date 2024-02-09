// import * as actionTypes from './utils/usersActionTypes'
// const userDataReducer = (state, action) => {
//     switch (action.type) {
//         case actionTypes.SET_USERS_DATA:
//             console.log(action.payload.data)
//             return {
//                 ...state,
//                 users: action.payload.data,
//             };

//         case actionTypes.SET_PAGINATED_USERS:
//             const { users, totalUsers, totalPages, currentPage, pageSize, startUser, endUser } = action.payload.data;
//             console.log(users, totalUsers, totalPages, currentPage, pageSize, startUser, endUser)
//             return {
//                 ...state,
//                 pagination: {
//                     ...state.pagination,
//                     paginatedUsers: users,
//                     totalUsers,
//                     totalPages,
//                     currentPage,
//                     pageSize,
//                     startUser,
//                     endUser,

//                     // currentPage: reducerData.currentPage,
//                     // totalPages: reducerData.totalPages || null
//                 },
//             };

//         case actionTypes.SET_SEARCH:
//             console.log(action.payload)
//             return {
//                 ...state,
//                 pagination: {
//                     ...state.pagination,
//                     search: action.payload,
//                     currentPage: 1
//                 },
//             };

//         case actionTypes.SET_PER_PAGE:
//             return {
//                 ...state,
//                 pagination: {
//                     ...state.pagination,
//                     pageSize: action.payload.data
//                 },
//             }

//         case actionTypes.SET_CUSTOM_PAGE:
//             return {
//                 ...state,
//                 pagination: {
//                     ...state.pagination,
//                     currentPage: action.payload
//                 }
//             }

//         case actionTypes.SET_LOADING:
//             return {
//                 ...state,
//                 pagination: {
//                     ...state.pagination,
//                     loading: !state.pagination.loading
//                 },
//             };

//         default:
//             return state;
//     }
// };

// export default userDataReducer;

import * as actionTypes from './utils/usersActionTypes'
const userDataReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USERS_DATA:
            return {
                ...state,
                users: { ...action?.payload } // Keep this if necessary
            };

        case actionTypes.SET_PAGINATED_USERS:
            const reducerData = action.payload.data;
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    paginatedUsers: reducerData.users,
                    totalUsers: reducerData.totalUsers,
                    totalPages: reducerData.totalPages,
                    currentPage: reducerData.currentPage,
                    startUser: reducerData.startUser,
                    endUser: reducerData.endUser,
                    pageSize: reducerData.pageSize
                },
            } : {
                ...state,
                settings: {
                    ...state.settings,
                    paginatedUsers: reducerData.users,
                    totalUsers: reducerData.totalUsers,
                    totalPages: reducerData.totalPages,
                    currentPage: reducerData.currentPage,
                    startUser: reducerData.startUser,
                    endUser: reducerData.endUser,
                    pageSize: reducerData.pageSize
                },
            };

        case actionTypes.SET_SEARCH:
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    search: action.payload.data,
                    currentPage: 1,
                },
            } : {
                ...state,
                settings: {
                    ...state.settings,
                    search: action.payload.data,
                    currentPage: 1,
                },
            };

        case actionTypes.SET_PER_PAGE:
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    pageSize: action.payload.data
                },
            } : {
                ...state,
                settings: {
                    ...state.settings,
                    pageSize: action.payload.data
                },
            };

        case actionTypes.SET_CUSTOM_PAGE:
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    currentPage: action.payload.data
                }
            } : {
                ...state,
                settings: {
                    ...state.settings,
                    currentPage: action.payload.data
                }
            };

        case actionTypes.SET_LOADING:
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    loading: !state.dashboard.loading
                }
            } : {
                ...state,
                settings: {
                    ...state.settings,
                    loading: !state.settings.loading
                }
            };

        case actionTypes.SET_SORT_BY:
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    sortBy: action.payload.data
                }
            } : {
                ...state,
                settings: {
                    ...state.settings,
                    sortBy: action.payload.data
                }
            }

        default:
            return state;
    }
};

export default userDataReducer;