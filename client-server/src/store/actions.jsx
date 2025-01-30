


export const LoginAction = (payload) => {
   return ({
      type: "AUTH",  payload
   })
}


export const ValidateTokenActon = (payload) => {
   return ({
      type: "ACCOUNT_VALIDATION", payload
   })
}
