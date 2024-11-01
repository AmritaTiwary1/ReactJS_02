import React,{useState} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import {login as storeLogin} from '../store/authSlice'
import authService from '../appwrite/auth'
import {Button , Input , Logo } from './index'
import { useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form'

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register,handleSubmit} = useForm();
    const [error, setError] = useState(null);
    
    const login = async(data) =>{      //This login is a fn which we will pass inside handlesubmit method of useForm, here, data is the value that is passed through {...register(email),{..}}
        setError(""); //whenever we start process, remember to empty the error(btw, here, error value is already "")
        try{
            const session = await authService.login(data) //data contains login info-email,password,once we get session then.....we will get current user in userData variable ,and then......we will send(dispatch) it to store
           if(session){
             const userData = await authService.getCurrentUser();
             if(userData){           //and then......we will send(dispatch) userData to store and then.....  we will navigate user to main route
                dispatch(storeLogin(userData));
                navigate('/')  //once , user login , we navigate to main route
             }
           }
        } catch(error){
            setError(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
{/* Since we are using reacthook form ,it provides handlesubmit method, which takes a reference of a function, most importantly we always use to write handleSubmit as a fn in submit task, but here it takes reference of fn.  */}
       <form onSubmit={handleSubmit(login)} className='mt-8'>
         <div className='space-y-5'>
            <Input
               label='Email' 
               placeholder='Enter Your Email'  //we can notice one thing -- in input.jsx compnent, it is not taking placeholder in parameter, butt since we have pass {...props}, so this will allow pl
               type='email'

               //register 
               {...register('email' , {
                required: true,
                validate: {
                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                }
               })}  
               ></Input>
{/* In input field, we write {...register(uniqueName,object)} ,it is required bcoz reacthook form provide a register keyword,which takes a unique name of the input field & object which contain some options(eg.required:true..etc) , 
and we are spreading it{...register}, bcoz login handleSubmit fn is taking data,and that data is handle by {...register(uni..)}, and all the input values such as email,password should be spread, otherwise different input field will get affected(overwritten) by one another  */}

               <Input
                label='Password: '
                placeholder='Enter Your Password'
                type='Password'
                {...register('password',{
                    required: true,
                })}
               />
               <Button
                type='submit'
                className='w-full'>  
                Sign in</Button>
         </div>
         
        </form> 
        </div>
    </div>
  )
}

//If we hadnt used useForm in this jsx, then we have to use useState to hanle email,password,etc. but since we are using useform , thatswhy register keyword of useForm is handling email,pswrd,etc.   


