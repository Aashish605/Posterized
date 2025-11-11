import { configureStore } from '@reduxjs/toolkit'
import CartSlice from './Cart/CartSlice'

export default configureStore({
    reducer:{
        Cart : CartSlice
    }
})
