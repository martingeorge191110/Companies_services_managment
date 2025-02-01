import axios from "axios";


const url = "http://localhost:8000"


export const UserAuth = axios.create({
   baseURL: `${url}/api/users/auth/`,
   withCredentials: true
})

export const Companies = axios.create({
   baseURL: `${url}/api/companies`,
   withCredentials: true
})
