import axios from "axios"
import AddRoles from "../../../componentLayer/pages/settings/SettingsComponents/Roles/AddRoles"
import Roles from "../../../componentLayer/pages/settings/SettingsComponents/Roles/Roles"
import { redirect } from "react-router-dom"
import { toast } from "react-toastify"
import atbtApi from "../../../serviceLayer/interceptor"

export const roleRouter = [
    {
        index: true,
        loader: async ({ params, request }) => {
            let url = new URL(request.url);
            let searchTerm = url.searchParams.get("search") || "";
            console.log(searchTerm, "role params")
            const data = await atbtApi.get(`/rbac/getroles?search=${searchTerm}`)
            console.log(data, "roles data")
            return data
        },

        action: async ({ request }) => {

            let formData = await request.formData();
            let { roleId } = JSON.parse(formData.get("serialized"));
            // const data = await axios.delete(`https://atbtmain.infozit.com/rbac/deleteRole/${roleId}`);
            return await toast.promise(
                atbtApi.delete(`/rbac/deleteRole/${roleId}`, {
                    headers: {
                        authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzMiwicm9sZUlkIjoyNSwiaWF0IjoxNzA5NjM0MDgwLCJleHAiOjIwMjQ5OTQwODB9.Mdk2PIIOnMqPX06ol5DKbSqp_CStWs3oFqLGqmFBhgo",
                    }
                }),
                {
                    pending: 'Deleting Role',
                    success: {
                        render({ data }) {
                            return `Role Deleted`
                        }
                    },
                    error: 'Unable to delete Role 🤯',
                },
            )
        },
        element: <Roles />
    },
    {
        path: 'upsert',
        loader: async ({ request, params }) => {
            let url = new URL(request.url);
            let searchTerm = url.searchParams.get("id");
            if (!searchTerm) {
                return null
            }
            try {
                // const { data, status } = await axios.get(`http://localhost:3000/rbac/getrolebyid/${searchTerm}`);
                const { data, status } = await atbtApi.get(`/rbac/getrolebyid/${searchTerm}`);
                // Check if the response is successful and return the data
                if (status === 200) {
                    return { response: data?.role };
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
                throw error; // Rethrow the error to be caught by the caller
            }
        },
        action: async ({ request }) => {
            let formData = await request.text()
            return redirect("..");
        },
        element: <AddRoles />
    },

]