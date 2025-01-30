import axios from "axios";


const url = "https://0286-197-39-174-56.ngrok-free.app"


export const UserAuth = axios.create({
   baseURL: `${url}/api/users/auth/`,
   withCredentials: true
})

export const Companies = axios.create({
   baseURL: `${url}/api/companies`,
   withCredentials: true
})
