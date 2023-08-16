import axios from "axios";

axios.interceptors.response.use(

    (response) => {
        return response;
    },
    async (error) => {
        console.log(error);
        window.location.href = "/authentication/sign-in";
        return Promise.reject(error);
    }
);
export default axios;