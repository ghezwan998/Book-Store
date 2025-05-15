import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Navbar/>
      <main className='h-screen'>
        <Outlet/>
      </main>
      
    </div>
  )
}

export default App