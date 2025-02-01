import { combineReducers, createStore } from "redux"


const USER = {
   token: localStorage.getItem("token") || null,
   info: null
}

const COMPANY = {
   accounting: {
      mainGraph: null
   }
}

const UserReducer = (state = USER, action) => {
   if (action.type === 'AUTH')
      return ({
         ...state, token: action.payload.token, info: action.payload
      })
   if (action.type === 'ACCOUNT_VALIDATION')
      return ({
         ...state, info: action.payload
      })
   return (state)
}


const CompanyReducer = (state = COMPANY, action) => {
   if (action.type === 'MAIN_GRAPH')
      return ({
         ...state, accounting: {
               ...state.accounting, mainGraph: action.payload
            }
         })

   return (state)
}

const Reducers = combineReducers({
   user: UserReducer,
   company: CompanyReducer
})


const store = createStore(Reducers)


export default store
