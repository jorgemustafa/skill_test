import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true

const axiosClient = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`
});

export default axiosClient