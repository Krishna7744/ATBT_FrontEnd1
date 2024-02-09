import axios from 'axios';
import { apiUrl } from "../../../utils/constants";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export const getAllUsers = async () => {
    const url = `${apiUrl}/user/list`;
    return axios.get(url);
};

export const getDashboardUsers = async (page, pageSize, sortBy, search) => {
    const url = `${apiUrl}/user/list?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&search=${search}`;
    return axios.get(url);
};

export const getSettingsUsers = async (page, pageSize, sortBy, search) => {
    const url = `${apiUrl}/user/list?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&search=${search}`;
    return axios.get(url);
};

export const getUserById = async (id) => {
    const url = `${apiUrl}/user/list/${id}`;
    return axios.get(url);
};

export const createUser = async (userData, token) => {
    const url = `${apiUrl}/admin/create-user`;
    return await toast.promise(
        axios.post(url, { ...userData }, {
            headers: {
                authorization: token,
            }
        }),
        {
            pending: 'Creating User...',
            success: {
                render({ data }) {
                    return `user created`
                }
            },
            error: 'Check user details 🤯',
        },
    )
}

export const deleteUser = async (id, token) => {
    const url = `${apiUrl}/admin/delete-user/${id}`;
    return await toast.promise(
        axios.delete(url, {
            headers: {
                authorization: token,
            }
        }),
        {
            pending: 'Deleting User',
            success: {
                render({ data }) {
                    return `user Deleted`
                }
            },
            error: 'Unable to delete user 🤯',
        },
    )
}

export const toggleUser = async (id) => {
    const url = `${apiUrl}/toggle${!!id ? `?id=${id}` : null}`
    const confirmed = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to toggle your online status?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, toggle it!',
        confirmButtonTextColor: "pink"
    });
    console.log(url, "toggle url")
}
