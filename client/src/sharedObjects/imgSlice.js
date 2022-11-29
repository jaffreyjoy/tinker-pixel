import { createSlice } from '@reduxjs/toolkit'

export const imgSlice = createSlice({
  name: 'img'
  , initialState: {
    value: {
      srcUrl: ""
    }
  }
  , reducers: {
    setImg: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setImg } = imgSlice.actions

export const selectImg = (state) => state.img.value

export default imgSlice.reducer
