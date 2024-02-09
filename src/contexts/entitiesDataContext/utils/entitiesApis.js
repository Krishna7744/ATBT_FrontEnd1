import axios from 'axios';
import { apiUrl } from "../../../utils/constants";
import { toast } from 'react-toastify';

export const getAllEntities = async () => {
    const url = `${apiUrl}/entite/list`;
    return axios.get(url);
};

export const getEntities = async (page, pageSize, sortBy, search) => {
    const url = `${apiUrl}/entite/list?page=${page ?? null}&pageSize=${pageSize ?? null}&sortBy=${sortBy ?? null}&search=${search ?? null}`;
    return axios.get(url);
};

export const getEntityById = async (id) => {
    const url = `${apiUrl}/entite/list/${id}`;
    return axios.get(url);
};

export const deleteEntity = async (id) => {
    const url = `${apiUrl}/entite/delete/${id}`
    return toast.promise(
        axios.delete(url),
        {
            pending: 'Deleting entity',
            success: {
                render({ data }) {
                    return 'entity Deleted';
                },
            },
            error: 'Unable to delete entity 🤯',
        },
    );
};

export const createEntity = async (entityData) => {
    const url = `${apiUrl}/entite/add`
    return toast.promise(
        axios.post(url, entityData),
        {
            pending: 'verifying data',
            success: {
                render(data) {
                    return `Entity created`
                }
            },
            error: 'Error in creating Entity 🤯',
        },
    );
};

