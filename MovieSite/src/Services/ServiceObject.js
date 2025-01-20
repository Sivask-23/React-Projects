import axios from "axios";

const API_KEY=process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const apiInstance=axios.create({
    baseURL:BASE_URL,
    params:{
        api_key:API_KEY,
    }
});

export const tmdb=apiInstance;