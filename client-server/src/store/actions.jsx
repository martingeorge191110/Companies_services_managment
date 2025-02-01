


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

export const mainGraphAccountingAction = (payload) => {
   return ({
      type: "MAIN_GRAPH", payload
   })
}
