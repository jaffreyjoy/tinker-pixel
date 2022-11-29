import { createSlice } from '@reduxjs/toolkit'

export const toolsSlice = createSlice({
  name: 'tools'
  , initialState: {
    value: {
        activeTool: "brightness"
        , toolValue: 100
    }
  }
  , reducers: {
    setTools: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setTools } = toolsSlice.actions

export const selectTools = (state) => state.tools.value

export default toolsSlice.reducer
