import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'app',
  initialState: { isLoggedIn: null },
  reducers: {
    setLoggedIn: (state, { payload: { loggedIn } }) => {
        state.isLoggedIn = loggedIn
    },
  },
})

export const { setLoggedIn } = slice.actions

export default slice.reducer
