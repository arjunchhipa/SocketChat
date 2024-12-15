import { configureStore } from '@reduxjs/toolkit'
import LoaderSlice from './slices/loaderslice'
import MessagesSlice from './slices/messagesslice'

export const store = configureStore({
    reducer:{
        Loader : LoaderSlice,
        Messages : MessagesSlice
    }
})