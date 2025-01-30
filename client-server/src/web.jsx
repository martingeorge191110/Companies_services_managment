import './App.css'
import HomePage from './pages/home.page.jsx'
import Navbar from './components/nav.bar.jsx'
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.js'
import CompaniesDatabase from './pages/companies.database.jsx'

function ServerApp() {

   return (
      <>
         <BrowserRouter>
            <Route component={Navbar} />
            <Switch >
               <Route exact path={"/companies/data-base/"} component={CompaniesDatabase} />
               <Route exact path={"/"} component={HomePage}/>
            </Switch>
         </BrowserRouter>
      </>
   )
}

export default ServerApp;
