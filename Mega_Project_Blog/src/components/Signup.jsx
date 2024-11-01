import React ,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {Button,Input,Logo} from './index.js'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth.js'
import { useDispatch } from 'react-redux'
import {login as storeLogin} from '../store/authSlice.js'

function Signup() {
         
   const dispatch = useDispatch();
   const navigate = useNavigate();
    const {register,handleSubmit} = useForm();
    const [error, setError] = useState(null);

    const create = async(data)=>{
      setError("");
      try{
       const userData = await authService.createAccount(data)   //data recieved from the form is used to create account
       if (userData) {    //if createaccount return some value then do the below task
       const userData = await authService.getCurrentUser();     //since createAccount only create a new account in database, we need all the info of user who is sign in , so we use getCurrentUser which return the info of that user which is signin in website through particular device
       if(userData) dispatch(storeLogin(userData));  //once above fn return data, dispatch it in store so that home button will now show the info
       navigate("/")  //  since in home, if user is not login ,then diffrent page will show, but the time when user logged in into web,it will render all the posts of the user that is stored in database
       }
      } catch(error){   //if error occur from above code, then--
          setError(error.message)
      }
    }

  return (
    <div className="flex items-center justify-center">
    <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
    <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%" />
            </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline"
            >
                Sign In
            </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
            <div className='space-y-5'>
                <Input
                label="Full Name: "
                placeholder="Enter your full name"
                {...register("name", {
                    required: true,
                })}
                />
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,})}
                />
                <Button type="submit" className="w-full">
                    Create Account
                </Button>
            </div>
        </form>
    </div>
</div>
 )
}

export default Signup

// //If we hadnt used useForm in this jsx, then we have to use useState to handle email,password,etc. but since we are using useform ,
// // thatswhy register keyword of useForm is handling email,pswrd,etc. One thing to note --- register keyword syntax contains name attribute,
// // which helps to spread the data properly(by name)in the object 


