import {configureStore} from '@reduxjs/toolkit' //this method is used to make store,
import todoReducer from '../features/todo/todoSlice'

export const store=configureStore({
    reducer:todoReducer
}) 