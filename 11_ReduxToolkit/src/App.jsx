import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'
import './App.css'
import { Provider } from 'react-redux'

function App() {
     return(<>
     <AddTodo></AddTodo> 
    <Todos></Todos>  
  </>   ) 
}

export default App
