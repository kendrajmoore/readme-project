
import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Home from "./pages/Home"
import SignUp from './pages/SignUp'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {


  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>    
    </>
  )
}

export default App
