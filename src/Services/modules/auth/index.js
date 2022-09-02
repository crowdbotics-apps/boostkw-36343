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
  },
})

export const { setUser, setRemeberUser } = slice.actions

export default slice.reducer
