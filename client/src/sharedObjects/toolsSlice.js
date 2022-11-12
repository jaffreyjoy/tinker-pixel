import { createSlice } from '@reduxjs/toolkit'

export const toolsSlice = createSlice({
  name: 'tools'
  , initialState: {
    value: {
        activeTool: 100
    }
  }
  , reducers: {
    settools: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { settools } = toolsSlice.actions

export const selecttools = (state) => state.tools.value

export default toolsSlice.reducer
