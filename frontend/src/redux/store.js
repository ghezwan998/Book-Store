import { configureStore } from '@reduxjs/toolkit'
import {booksApi} from './bookApi';
import { orderApi } from './orderApi';
import { userApi } from './userApi';
import { statsApi } from './statsApi';
import cartReducer from './cart';

const store = configureStore({
    reducer:{
        [statsApi.reducerPath]: statsApi.reducer,
        [booksApi.reducerPath]: booksApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(booksApi.middleware,userApi.middleware,orderApi.middleware,statsApi.middleware)
})

export default store;