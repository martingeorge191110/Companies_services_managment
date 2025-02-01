import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/login.jsx';
import ServerApp from './web.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { useLayoutEffect, useState } from 'react';
import { ValidateTokenApi } from './services/user.auth.jsx';
import { ValidateTokenActon } from './store/actions.jsx';
import Register from './pages/register.jsx';
import LoadingPage from './pages/loading.jsx';
import HomePage from './pages/home.page.jsx';
import Navbar from './components/nav.bar.jsx';
import AccountingSystem from './pages/accounting.dashboard.jsx';





function App() {

  const dispatch = useDispatch()

  const token = useSelector(
    state => state.user.token
  )
  const userInfo = useSelector(
    state => state.user.info
  )

  const [isLoading, setIsLoading] = useState(true)


  useLayoutEffect( () => {
    if (!userInfo) {
        ValidateTokenApi(token).then(
          res => {
            if (res.success) {
              dispatch(ValidateTokenActon(res.data))
            }
            setIsLoading(false)
          }
        ).catch(
          rej => {
            dispatch(ValidateTokenActon(null))
            setIsLoading(false)
          }
        )
    }
  }, [])




  return (
    <>
      <Router>

        <Switch >
          <Route exact path="/login" component={!isLoading && !userInfo ? Login : InvlaidAuth}/>
          <Route exact path="/register" component={!isLoading && !userInfo ? Register : InvlaidAuth}/>
          { isLoading ? <LoadingPage/> : userInfo ? <ServerApp/> : <InvlaidAuth/>}
        </Switch>
      </Router>
    </>
  )
}


const InvlaidAuth = () => {

  return (
    <>
        <Navbar />
        <HomePage />
    </>
  )
}

export default App
