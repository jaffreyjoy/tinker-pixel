import { createSlice } from '@reduxjs/toolkit'

export const canvasContextSlice = createSlice({
  name: 'canvasContext'
  , initialState: {
    value: {
      // canvasEl: {},
      canvasCtx: {}
    }
  }
  , reducers: {
    setCanvasContext: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setCanvasContext } = canvasContextSlice.actions

export const selectCanvasContext = (state) => state.canvasContext.value

export default canvasContextSlice.reducer
