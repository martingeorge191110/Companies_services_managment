import axios from "axios";


const url = "https://ee5c-45-243-101-20.ngrok-free.app"


export const UserAuth = axios.create({
   baseURL: `${url}/api/users/auth/`,
   withCredentials: true
})

export const Companies = axios.create({
   baseURL: `${url}/api/companies`,
   withCredentials: true
})
