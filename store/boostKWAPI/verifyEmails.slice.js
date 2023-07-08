import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const accounts_registration_verify_email_create = createAsyncThunk(
  "verifyEmails/accounts_registration_verify_email_create",
  async payload => {
    const response = await apiService.accounts_registration_verify_email_create(
      payload
    )
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const verifyEmailsSlice = createSlice({
  name: "verifyEmails",
  initialState,
  reducers: {},
  extraReducers: {
    [accounts_registration_verify_email_create.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [accounts_registration_verify_email_create.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities.push(action.payload)
        state.api.loading = "idle"
      }
    },
    [accounts_registration_verify_email_create.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    }
  }
})
export default {
  accounts_registration_verify_email_create,
  slice: verifyEmailsSlice
}
