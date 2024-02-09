import * as actionTypes from './usersActionTypes'
export const setUsersData = (data, context) => ({
    type: actionTypes.SET_USERS_DATA,
    payload: { context: context, data: data }
});
export const setDashboardUsers = (data, context) => ({
    type: actionTypes.SET_PAGINATED_USERS,
    payload: { context: context, data: data },
});
export const setSettingsUsers = (data, context) => ({
    type: actionTypes.SET_PAGINATED_USERS,
    payload: { context: context, data: data }
});
export const setLoading = (context) => ({
    type: actionTypes.SET_LOADING,
    payload: { context: context }
});

export const setPerPage = (data, context) => ({
    type: actionTypes.SET_PER_PAGE,
    payload: { context: context, data: data }
});

export const setSortBy = (data, context) => ({
    type: actionTypes.SET_SORT_BY,
    payload: { context: context, data: data }
});