import React from 'react'
import '../CssComponents/MainLayout.css'
import Header from './Header'
import { Outlet } from 'react-router-dom'
const MainLayout = () => {
  return (
    <div className='mainLayoutOuter'>
        <Header/>
        <div className='main-contentLayout'>
            <Outlet/>
        </div>
    </div>
  )
}

export default MainLayout