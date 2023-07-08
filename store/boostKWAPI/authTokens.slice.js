import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const accounts_login_token_create = createAsyncThunk(
  "authTokens/accounts_login_token_create",
  async payload => {
    const response = await apiService.accounts_login_token_create(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const authTokensSlice = createSlice({
  name: "authTokens",
  initialState,
  reducers: {},
  extraReducers: {
    [accounts_login_token_create.pending]: (state, action) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [accounts_login_token_create.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.entities.push(action.payload)
        state.api.loading = "idle"
      }
    },
    [accounts_login_token_create.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    }
  }
})
export default { accounts_login_token_create, slice: authTokensSlice }
