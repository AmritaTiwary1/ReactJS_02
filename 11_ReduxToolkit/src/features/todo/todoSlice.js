import {createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = { 
    todos: [{id: 1, text: "Hello world"}]
}

/*function sayHello(state,action){
    comsole.log("hello");   //to give reference to addTodo
}*/


export const todoSlice = createSlice({

    name: 'todo',   //this slice name is todos which can be seen in chrome extension

    initialState,  //or initialState ={todos:[{id:1,text:"hello"}]} ....this is already defined above which contain an object -- todos:[{id:1,text:"hello"}]

    reducers: {  //values of slice can only change using reducer:reducer contain two things -- property & function, unlike contextAPI ,function is not only declared but also defined at same time

            // addTodo:sayHello;  --> this is also the way, here ADDTODO -PROPERTY & SAYHELLO-FUCTION
    //addTodo:(state,action)=>{} -->state allows to access initial state(todos,..etc) and action is parameter that is passed when it will be called in components 
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(), 
                text: action.payload //payload is object which is passes as argument(action)
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload )  //there is no pull,remove fn thatswhy we will update state.todos by filtering
        },
    }
})

export const {addTodo, removeTodo} = todoSlice.actions    //actions is all the method inside reducers ie addtodo,removetodo,etc.., here we are writing this bcoz if we write reducer name then it will be easy to use in component

export default todoSlice.reducer