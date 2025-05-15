import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-48 p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
        <Outlet/>
      </main>
    </div>
  )
}

export default Dashboard