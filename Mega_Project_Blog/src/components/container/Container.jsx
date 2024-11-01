import React from 'react'

function Container({children}) {
  return  <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>;  ////here, we can remove curly bracket, bcoz only one thing is there, like if-else , After return, statement should be in same line ,if no bracket, else giving error
}

export default Container


