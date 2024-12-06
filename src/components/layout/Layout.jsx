import React from 'react'
import { Outlet } from 'react-router-dom'
import Menu from '../menu/Menu.jsx'
import Footer from '../footer/Footer.jsx'

const Layout = () => {
  return (
    <div>
        <Menu />
        <Outlet/>
       <Footer/>
    </div>
  )
}

export default Layout