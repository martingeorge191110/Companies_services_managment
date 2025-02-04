


export const AuthAction = (payload) => {
   return ({
      type: "AUTH",  payload
   })
}


export const ValidateTokenActon = (payload) => {
   return ({
      type: "ACCOUNT_VALIDATION", payload
   })
}

/**
 * 
 * Payload: {id, result} 
 */
export const mainGraphAccountingAction = (payload) => {
   return ({
      type: "MAIN_GRAPH", payload
   })
}

/**
 * 
 * Payload: {id, result} 
 */
export const dailyGraphAccountingAction = (payload) => {
   return ({
      type: "DAILY_GRAPH", payload
   })
}
