#!/usr/bin/env node
import { Companies } from "./axios.instance.js";


const balanceUrl = '/accounting/balance/'




export const BalanceOverviewApi = async (token, companyId) => {
   try {
      const response = await Companies.get(`${balanceUrl}?company_id=${companyId}`, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      })

      return (response.data)
   } catch (err) {
      throw (err.response)
   }
}
