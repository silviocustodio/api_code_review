import axios from 'axios';

const api = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/http://zpx-codetest.herokuapp.com/api/v1/stats/steam/',
    headers: {"Access-Control-Allow-Origin": "*"}
});

export default api;
