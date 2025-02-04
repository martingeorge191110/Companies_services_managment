import { Companies } from "./axios.instance.js";



export const CompaniesDatabaseApi = async (token) => {
  try {
    const response = await Companies.get("/database/", {
      headers: {
        Authorization: `Baerer ${token}`
      }
    })

    return (response.data)
  } catch (err) {
    return (err.response.data)
  }
}

export const CompaniesDashboardApi = async (token, company_id) => {
  try {
    const response = await Companies.get(`/dashboard/?company_id=${company_id}`, {
      headers: {
        Authorization: `Baerer ${token}`
      }
    })

    return (response.data)
  } catch (err) {
    return (err.response.data)
  }
}
