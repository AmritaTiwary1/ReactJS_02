import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch=useDispatch();
    const logouthandler=()=>{
        authService.logout().then(()=>{   //here, we used promise but we can also use async await i.e=> const logouthandler=async()=> .../n...  { try( isLogout = await authservice.logout(); ../n.. if(isLogout) dispatch(logout();)  ../n...   catch(error){throw error ; console.log("logout error");} }
          dispatch(logout())
        })

    }
  return (
   <button onClick={logouthandler} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' >
    Logout</button> 
  )
}

export default LogoutBtn
