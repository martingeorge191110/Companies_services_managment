import './App.css'
import HomePage from './pages/home.page.jsx'
import Navbar from './components/nav.bar.jsx'
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.js'
import CompaniesDatabase from './pages/companies.database.jsx'
import CompanyRegister from './pages/register.company.jsx'
import CompanyDashboard from './pages/company.dashboard.jsx'
import AccountingSystem from './pages/accounting.dashboard.jsx'

function ServerApp() {



   return (
      <>
         <BrowserRouter>
            <Route component={Navbar} />
            <Switch >
               <Route exact path={"/companies/data-base/"} component={CompaniesDatabase} />
               <Route exact path={"/companies/register/"} component={CompanyRegister} />
               <Route exact path={"/companies/dashboard/:id"} component={CompanyDashboard} />
               <Route exact path={"/companies/accounting/:id"} component={AccountingSystem}/>
               <Route exact component={HomePage}/>
            </Switch>
         </BrowserRouter>
      </>
   )
}

export default ServerApp;
