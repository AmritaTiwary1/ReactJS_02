import React,{useEffect,useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'


//File name & function name can be different

export default function Protected({
  children,
  authentication = true
}) {   

  const navigate = useNavigate();
  const [loader,setLoader] = useState(true);
  
  const authStatus = useSelector(state =>{
    state.auth.status
  })

  useEffect(()=>{

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
//If below code is hard to understand then ignore authentication word, see above code 

        if(authentication && authStatus!==authentication ){
            navigate('/login')
      } else if(!authentication && authStatus!==authentication) {
            navigate('/')
      }
      setLoader(false)
  },[authStatus,navigate,authentication])

  return (
    loader? <h1>Loading...</h1> :<>{children}</>
  )
}
 