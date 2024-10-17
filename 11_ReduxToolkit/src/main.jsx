import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux' //for using redux  in my website
import { store } from './App/store.js' //accessing store features of redux in website
createRoot(document.getElementById('root')).render(
 
  // provider take store as props,from where we can access/update it , so store={store}bcoz our store name is store,if we save store.js file as mystore.js then <Provider store={mystore}></Provider> will be weritten
  <Provider store={store}>
  <App />
  </Provider>,
)
