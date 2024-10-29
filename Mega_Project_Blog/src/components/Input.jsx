import React,{useId} from 'react';

import { forwardRef } from 'react'; //By using forwardRef, you can pass a reference from a parent component to a child component, even if that child component is wrapped inside another component. This enables the parent
// component to directly interact with the child’s DOM element or instance

const Input = forwardRef( function Input({            //remember,when we use input field,then we use usestate there in email,password butt here, we had made only one input component and using this in every jsx like-- in signup.jsx,in login.jsx,maybe in future -we will use this input field in contact.jsx too.... so here, one problem arise---lets say we have made input field using input tag in login.jsx, then on clicking submit btn, we will get the value of input using usestate, btt when we use input component in login.jsx, then we just pass some props to input.jsx from login.jsx, then how can we access input value, the answer is using forwardref  THIS IS ONE WAY TO USE FORWARD REF, ANOTHER & COMMON WAY IS USE REF IS IN SELECT.JSX
   label,
   type="text",
   className="",
   ...props
},ref){
    const id=useId();
    return (
        <div className="w-full">
            {label && <label
                className="inline-block mb-1 pl-1"
                htmlFor={id}> 
        </label>}
                <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
               ref={ref}
                {...props}
                id={id}
            ></input>
        </div>
    )
})
export default Input