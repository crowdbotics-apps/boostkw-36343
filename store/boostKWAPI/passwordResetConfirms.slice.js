import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const accounts_password_reset_confirm_create = createAsyncThunk(
  "passwordResetConfirms/accounts_password_reset_confirm_create",
  async payload => {
    const response = await apiService.accounts_password_reset_confirm_create(
      payload
    )
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const passwordResetConfirmsSlice = createSlice({
  name: "passwordResetConfirms",
  initialState,
  reducers: {},
  extraReducers: {
    [accounts_password_reset_confirm_create.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [accounts_password_reset_confirm_create.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities.push(action.payload)
        state.api.loading = "idle"
      }
    },
    [accounts_password_reset_confirm_create.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    }
  }
})
export default {
  accounts_password_reset_confirm_create,
  slice: passwordResetConfirmsSlice
}