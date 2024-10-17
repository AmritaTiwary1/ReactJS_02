import './App.css'
import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {login} from './store/authSlice'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import { Outlet } from 'react-router-dom'

function App() { 
  const [loading,setLoading]=useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
      dispatch(login({userData}))
      }
    else{
      dispatch(logout())
    }
    })
    .finally(()=> setLoading(false))

  },[]) 

  return !loading?(<div className='min-h-screen flex flex-wrap content-between'><div className='w-full block'>
   <div className='w-full block'>
    <Header></Header>
    <main>
      OUTLET
    {/* <Outlet></Outlet> */}
    </main>
    
    <Footer></Footer></div>
    </div></div>):(<h1>Loading</h1>)
}

export default App
