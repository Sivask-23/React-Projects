import axios from "axios";


const BASE_URL='https://rubiksoftwares.com/demoelectric/public/api/'
const axiosinstance=axios.create({
    baseURL:BASE_URL,
    headers: { 
        'Content-Type': 'application/json'
      }

})

export const apiInstance=axiosinstance;