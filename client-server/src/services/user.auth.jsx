import { AxiosError } from 'axios';
import { UserAuth } from './axios.instance';


export const LoginApi = async ({userEmail, password}) => {
   try {
      const response = await UserAuth.post("/login/", {
         email: userEmail, password: password
      }, {
         headers: {
            "Content-Type": "application/json"
         }
      })

      return (response.data)
   } catch (err) {
      return (err.response.data)
   }
}

export const RegisterApi = async ({f_n, l_n, email, password, con_pass}) => {
   try {
      const response = await UserAuth.post("/register/", {
         f_n, l_n, email, password, con_pass
      }, {
         headers: {
            "Content-Type": "application/json"
         }
      })

      return (response.data)
   } catch (err) {
      return (err.response.data)
   }
}

export const ValidateTokenApi = async (token) => {
   try {
      const response = await UserAuth.get("/validate-token/", {
         headers: {
            Authorization: `Bearer ${token}`
         }
      })

      return (response.data)
   } catch (err) {
      return (err.response.data)
   }
}
