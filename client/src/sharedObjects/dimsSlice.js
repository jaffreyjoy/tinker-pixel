import { createSlice } from '@reduxjs/toolkit'

export const dimsSlice = createSlice({
  name: 'dims'
  , initialState: {
    value: {w: 500, h: 500}
  }
  , reducers: {
    setDims: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setDims } = dimsSlice.actions

export const selectDims = (state) => state.dims.value

export default dimsSlice.reducer
