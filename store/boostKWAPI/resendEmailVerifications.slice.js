import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const accounts_registration_resend_email_create = createAsyncThunk(
  "resendEmailVerifications/accounts_registration_resend_email_create",
  async payload => {
    const response = await apiService.accounts_registration_resend_email_create(
      payload
    )
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const resendEmailVerificationsSlice = createSlice({
  name: "resendEmailVerifications",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        accounts_registration_resend_email_create.pending,
        (state, action) => {
          if (state.api.loading === "idle") {
            state.api.loading = "pending"
          }
        }
      )
      .addCase(
        accounts_registration_resend_email_create.fulfilled,
        (state, action) => {
          if (state.api.loading === "pending") {
            state.entities.push(action.payload)
            state.api.loading = "idle"
          }
        }
      )
      .addCase(
        accounts_registration_resend_email_create.rejected,
        (state, action) => {
          if (state.api.loading === "pending") {
            state.api.error = action.error
            state.api.loading = "idle"
          }
        }
      )
  }
})
export default {
  accounts_registration_resend_email_create,
  slice: resendEmailVerificationsSlice
}
