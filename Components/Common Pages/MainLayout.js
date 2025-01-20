import React from 'react'
import '../../ComponentsCss/Common Pages/MainLayout.css'
import Header from './Header'
import { Outlet } from 'react-router-dom'


const MainLayout = () => {
  return (
    <div className='outer-layout'>
        <Header />
        <div className='inner-layout'>
        <Outlet />
        </div>
    </div>
  )
}

export default MainLayout