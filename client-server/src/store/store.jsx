import { combineReducers, createStore } from "redux"


const USER = {
   token: localStorage.getItem("token") || null,
   info: null
}

const COMPANIES = {
   accounting: {
      mainGraphs: {},
      dailyGraphs: {}
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


const CompanyReducer = (state = COMPANIES, action) => {
   if (action.type === 'MAIN_GRAPH')
      return ({
         ...state, accounting: {
               ...state.accounting, mainGraphs: {
                  ...state.accounting.mainGraphs,
                  [`${action.payload.id}`]: action.payload.result
               }
            }
         })
   if (action.type === 'DAILY_GRAPH')
      return ({
         ...state, accounting: {
            ...state.accounting, dailyGraphs: {
               ...state.accounting.mainGraphs,
               [`${action.payload.id}`]: action.payload.result
            }
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
