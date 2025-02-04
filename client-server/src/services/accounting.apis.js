import { Companies } from "./axios.instance.js";


const mainGraphUrl = "/accounting/main-graph/"
const dailyGraphUrl = "/accounting/main-daily-graph/"


export const mainGrapthApi = async (token, companyId) => {
   try {
      const response = await Companies.get(`${mainGraphUrl}?company_id=${companyId}`, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      })

      return (response.data)
   } catch (err) {
      throw (err.response)
   }
}

export const dailyMainGraphApi = async (token, companyId) => {
   try {
      const response = await Companies.get(`${dailyGraphUrl}?company_id=${companyId}`, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      })

      return (response.data)
   } catch (err) {
      throw (err.response)
   }
}
