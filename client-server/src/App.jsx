import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.js'
import Login from './pages/login.jsx';
import ServerApp from './web.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { useLayoutEffect, useState } from 'react';
import { ValidateTokenApi } from './services/user.auth.jsx';
import { ValidateTokenActon } from './store/actions.jsx';



function App() {

  const dispatch = useDispatch()

  const token = useSelector(
    state => state.user.token
  )
  const userInfo = useSelector(
    state => state.user.info
  )


  useLayoutEffect( () => {
    if (!userInfo) {
        ValidateTokenApi(token).then(
          res => res.success && dispatch(ValidateTokenActon(res.data))
        ).catch(
          rej => dispatch(ValidateTokenActon(null))
        )
    }
  }, [])




  return (
    <>
      <BrowserRouter>
      {/* <Route  */}
        <Switch >
          <Route exact path={"/login"} component={!userInfo ? Login : ServerApp}/>
          <Route exact component={ServerApp}/>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
