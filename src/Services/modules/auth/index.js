import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, remember: null, profile: null },
  reducers: {
    setUser: (state, { payload: { user } }) => {
      state.user = user
    },
    setRemeberUser: (state, { payload: { remember } }) => {
      state.remember = remember
    },
    setProfile: (state, { payload: { profile } }) => {
      state.profile = profile
    },
    logOut: (state, payload) => {
      state.user = null
      state.remember = null
      state.profile = null
    },
  },
})

export const { setUser, setRemeberUser, logOut, setProfile } = slice.actions

export default slice.reducer
