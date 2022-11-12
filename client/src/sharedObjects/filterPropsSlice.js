import { createSlice } from '@reduxjs/toolkit'

export const filterPropsSlice = createSlice({
  name: 'filterProps'
  , initialState: {
    value: {
        "brightness": 100
        , "blur": 0
        , "contrast": 100
        , "grayscale": 0
        , "hue-rotate" : 0
        , "invert": 0
        , "opacity": 100
        , "saturate": 100
        , "sepia": 0
    }
  }
  , reducers: {
    setFilterProps: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setFilterProps } = filterPropsSlice.actions

export const selectFilterProps = (state) => state.filterProps.value

export default filterPropsSlice.reducer
