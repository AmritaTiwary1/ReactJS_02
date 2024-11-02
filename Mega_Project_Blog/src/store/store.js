import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'

const store = configureStore({
 
    reducer:{
        auth: authSlice
        //TODO: add more slices here for posts, but why ?
        // Bcoz - if we login into website, and close the localhost, then when we again open, we dont need to again login, bcoz authentication info is stored in slices(redux),
        //in the same way, if we make slice of post,then we dont have to do request from appwrite(backend) to show all posts on the website, once user create posts, we will save to store, and everytime we open website,it will load from store not from backened
    }
});

export default store;

