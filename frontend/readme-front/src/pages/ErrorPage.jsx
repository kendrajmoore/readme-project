import React from 'react'
import Header from '../components/Header'

function ErrorPage() {
  return (
    <>
      <Header/>
      <h1 id='title'>Page Not Found</h1>
      <img id='error' className="spin-image" src="../src/assets/404.png"/>
    </>
  )
}

export default ErrorPage