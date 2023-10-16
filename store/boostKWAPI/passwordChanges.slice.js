import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const accounts_password_change_create = createAsyncThunk(
  "passwordChanges/accounts_password_change_create",
  async payload => {
    const response = await apiService.accounts_password_change_create(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const passwordChangesSlice = createSlice({
  name: "passwordChanges",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(accounts_password_change_create.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(accounts_password_change_create.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities.push(action.payload)
          state.api.loading = "idle"
        }
      })
      .addCase(accounts_password_change_create.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
  }
})
export default { accounts_password_change_create, slice: passwordChangesSlice }
