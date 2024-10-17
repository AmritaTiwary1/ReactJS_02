import { forwardRef } from "react"  //THIS IS ONE WAY TO USE FORWARD REF, ANOTHER & COMMON WAY IS USE REF IS IN INPUT.JSX
import React,{useId} from 'react'

function Select({
    options,
    label,
    className, //or className="", if user dont pass classname ,then empty string will manage everything
    ...props
},ref) {
    const id=useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className='' ></label>}
        <Select
         {...props}
         id={id}
         ref={ref}
         className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full${className}`}
        >
           {options?options.map((option)=>{    //OR    {options?.map((option)=><option key={option} value={option}>{option}</option> ))}  ******** here,options?.map is also working, and then :null(else part) is not important
            return (
                 <option key={option} value={option}>
                    {option}
                 </option>
            )
           }):null}
        </Select>
    </div> 
  )
}

export default forwardRef(Select)