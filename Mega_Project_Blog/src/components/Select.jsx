  //THIS IS ONE WAY TO USE FORWARD REF, ANOTHER & COMMON WAY IS USE REF IS IN INPUT.JSXimport React,{useId} from 'react'
import React,{useId} from "react"
import { forwardRef } from "react"

function Select({   //when we use forwardref , we have to pass it to functions as arguments
    options,
    label,
    className, //or className="", if user dont pass classname ,then empty string will manage everything
    ...props
},ref) {
    const id=useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className='' ></label>}
        <select
         {...props}
         id={id}
         ref={ref}
         className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
           {options?.map((option)=>(  //OR    {options?.map((option)=><option key={option} value={option}>{option}</option> ))}  ******** here,options?.map is also working, and then :null(else part) is not important (
                 <option key={option} value={option}>
                    {option}
                 </option>
            ))}
        </select>
    </div> 
  )}
export default forwardRef(Select)  //instead of wrapping the whole select fn inside forwardref(as we did in input.jsx) , we can also wrap select while exporting it(as we did in this (select.jsx))
