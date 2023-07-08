import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const accounts_signup_create = createAsyncThunk(
  "signups/accounts_signup_create",
  async payload => {
    const response = await apiService.accounts_signup_create(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const signupsSlice = createSlice({
  name: "signups",
  initialState,
  reducers: {},
  extraReducers: {
    [accounts_signup_create.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [accounts_signup_create.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities.push(action.payload)
        state.api.loading = "idle"
      }
    },
    [accounts_signup_create.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    }
  }
})
export default { accounts_signup_create, slice: signupsSlice }
