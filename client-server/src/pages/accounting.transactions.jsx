import React, { useEffect, useLayoutEffect, useState } from "react";
import OverviewSection from "../components/transactions.overview.jsx";
import CreateTransactionSection from "../components/transactions.create.jsx";
import TransactionsSection from "../components/transactions.display.jsx";
import { useHistory } from "react-router-dom/cjs/react-router-dom.js";
import UnauthorizedPage from "./not.authorized.jsx";
import TransactionsChart from "../components/transactions.charts.jsx";
import { BalanceOverviewApi } from "../services/transactions.apis.js";
import { useSelector } from "react-redux";
import LoadingPage from "./loading.jsx";



const TransactionManagementPage = () => {
   const history = useHistory()
   const company = history.location.state
   const token = useSelector(
      state => state.user.token
   )

   const [isAuthErr, setIsAuthErr] = useState(false)
   const [isLoading, setIsLoading] = useState(true)

   const [balance, setBalance] = useState(null)
   const [balanceErr, setBalanceErr] = useState(null)
   useLayoutEffect(() => {
      if (!company || !company.id) {
         setIsAuthErr(true)
         return;
      }
      if (!balance) {
         BalanceOverviewApi(token, company.id).then(
            res => {
               // console.log(res)
               if (res.success) {
                  setBalance({
                     assets: {total: res.data.assets.total,
                        assetsChanges: res.data.assets.total > 0 ? ((((res.data.assets.total - res.data.assets.rates.current_month_rate) - (res.data.assets.total - res.data.assets.rates.prev_month_rate)) / res.data.assets.total) * 100).toFixed(1) : 0
                     },
                     liabilities: {total: res.data.liabilities.total,
                        liabilitiesChanges: res.data.liabilities.total > 0 ? ((((res.data.liabilities.total - res.data.liabilities.rates.current_month_rate) - (res.data.liabilities.total - res.data.liabilities.rates.prev_month_rate)) / res.data.liabilities.total) * 100).toFixed(1) : 0
                     },
                     equity: {total: res.data.equity.total,
                        equityChanges: res.data.equity.total > 0 ? ((((res.data.equity.total - res.data.equity.rates.current_month_rate) - (res.data.equity.total - res.data.equity.rates.prev_month_rate)) / res.data.equity.total) * 100).toFixed(1) : 0
                     }
                  })
               }
            }
         ).catch(
            err => {
               setBalanceErr({
                  status: err.status, message: 'Cannot reload the the accoutning balance equation overview cause' + ` (${err.data.message})`, validationErrors: err.data.validationErrors || null
               })
            }
         )

      }
   }, [])

   useEffect(() => {
      if (balance || balanceErr)
         setIsLoading(false)
   }, [balance, balanceErr])


   return (
      <> {
         isLoading ? <LoadingPage /> : isAuthErr ? <UnauthorizedPage /> :
         <div className="min-h-screen w-screen mt-28 bg-transparent p-6">
            {/* <div> */}
            <OverviewSection errorLoaded={balanceErr} systemId={company.id} token={token} balanceEquation={balance}/>
            {/* <CreateTransactionSection /> */}
            {/* </div> */}
            {/* <div> */}
            <TransactionsSection />
            <TransactionsChart />
            {/* </div> */}
         </div>
      } </>
   );
};

export default TransactionManagementPage;
