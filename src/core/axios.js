import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8000';
window.axios = axios;

export default axios;