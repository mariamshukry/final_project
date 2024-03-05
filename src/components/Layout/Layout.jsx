import React, { useContext, useEffect } from 'react'
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { userContext } from './../../context/TokenContext';
import { Offline } from 'react-detect-offline';

export default function Layout() {
let {setToken} =useContext(userContext)
useEffect(()=>{
if(localStorage.getItem('userToken') !== null){
setToken(localStorage.getItem('userToken'))
}
},[])

  return (
    <div>
    <Offline>
    <div className='network'>
    <i className='fas fa-wifi'></i>
    </div>
    </Offline>
    <Navbar/>
    <div className="container">
    <Outlet/>
    </div>
    footer
    </div>
  )
}
