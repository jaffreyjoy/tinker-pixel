import { configureStore } from '@reduxjs/toolkit'
import canvasContextReducer from '../sharedObjects/canvasContextSlice';
import filterPropsReducer from '../sharedObjects/filterPropsSlice';
import imgReducer from '../sharedObjects/imgSlice';
import toolsReducer from '../sharedObjects/toolsSlice';
import dimsReducer from '../sharedObjects/dimsSlice';


export default configureStore({
  reducer: {
    dims: dimsReducer
    , canvasContext: canvasContextReducer
    , filterProps: filterPropsReducer
    , img: imgReducer
    , tools: toolsReducer
  },
})