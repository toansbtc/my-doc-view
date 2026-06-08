import axios from "axios";
import { myUrl } from "./myUrl";

const api = axios.create({
    baseURL: myUrl,
    withCredentials: true
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error.response.status;
        const url = originalRequest?.url;

        if (!error.response) return Promise.reject(error);

        if (url === "/user/login") return Promise.reject(error);
        if (url === "/user/get-token") return Promise.reject(error);

        if (status === 401) {
            await api.post("/user/get-token", {}, {
                withCredentials: true
            })
            console.log("fulfilled get new token")
            return api.request(error.config)
        }
        return Promise.reject(error);
    }
)

export default api