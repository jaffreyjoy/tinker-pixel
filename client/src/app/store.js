import { configureStore } from '@reduxjs/toolkit'
import dimsReducer from '../sharedObjects/dimsSlice';


export default configureStore({
  reducer: {
    dims: dimsReducer
  },
})