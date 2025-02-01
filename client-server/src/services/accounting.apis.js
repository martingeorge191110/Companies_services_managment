import { Companies } from "./axios.instance.js";


const baseURL = "/accounting/main-graph/"


export const mainGrapthApi = async (token, companyId) => {
   try {
      const response = await Companies.get(`${baseURL}?company_id=${companyId}`, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      })

      return (response.data)
   } catch (err) {
      return (err.response.data)
   }
}
