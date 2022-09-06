import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, remember: null },
  reducers: {
    setUser: (state, { payload: { user } }) => {
      state.user = user
    },
    setRemeberUser: (state, { payload: { remember } }) => {
      state.remember = remember
    },
    logOut: (state, payload) => {
      state.user = null
      state.remember = null
    },
  },
})

export const { setUser, setRemeberUser, logOut } = slice.actions

export default slice.reducer
