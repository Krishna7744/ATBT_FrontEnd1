export const initialState = {
    users: [],
    dashboard: {
        paginatedUsers: [],
        search: "",
        sortBy: "createdAt",
        loading: false,
        totalUsers: null,
        totalPages: null,
        currentPage: 1,
        pageSize: 5,
        startUser: null,
        endUser: null,
    },
    settings: {
        paginatedUsers: [],
        search: "",
        sortBy: "createdAt",
        loading: false,
        totalUsers: null,
        totalPages: null,
        currentPage: 1,
        pageSize: 10,
        startUser: null,
        endUser: null,
    }
};