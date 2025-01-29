import { useState } from 'react'
import './App.css'
import HomePage from './pages/home.page.jsx'
import Navbar from './components/nav.bar.jsx'
import { BrowserRouter, Switch } from 'react-router-dom/cjs/react-router-dom.js'

function App() {

  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Switch >
          
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
