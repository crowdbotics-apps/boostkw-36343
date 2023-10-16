import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const crews_list = createAsyncThunk(
  "crews/crews_list",
  async payload => {
    const response = await apiService.crews_list(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const crewsSlice = createSlice({
  name: "crews",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(crews_list.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(crews_list.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = action.payload
          state.api.loading = "idle"
        }
      })
      .addCase(crews_list.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
  }
})
export default { crews_list, slice: crewsSlice }
