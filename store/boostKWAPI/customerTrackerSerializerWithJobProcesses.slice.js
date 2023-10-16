import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const trackers_customer_tracker_active_read = createAsyncThunk(
  "customerTrackerSerializerWithJobProcesses/trackers_customer_tracker_active_read",
  async payload => {
    const response = await apiService.trackers_customer_tracker_active_read(
      payload
    )
    return response.data
  }
)
export const trackers_customer_tracker_inputs_create = createAsyncThunk(
  "customerTrackerSerializerWithJobProcesses/trackers_customer_tracker_inputs_create",
  async payload => {
    const response = await apiService.trackers_customer_tracker_inputs_create(
      payload
    )
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const customerTrackerSerializerWithJobProcessesSlice = createSlice({
  name: "customerTrackerSerializerWithJobProcesses",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        trackers_customer_tracker_active_read.pending,
        (state, action) => {
          if (state.api.loading === "idle") {
            state.api.loading = "pending"
          }
        }
      )
      .addCase(
        trackers_customer_tracker_active_read.fulfilled,
        (state, action) => {
          if (state.api.loading === "pending") {
            state.entities = [
              ...state.entities.filter(
                record => record.id !== action.payload.id
              ),
              action.payload
            ]
            state.api.loading = "idle"
          }
        }
      )
      .addCase(
        trackers_customer_tracker_active_read.rejected,
        (state, action) => {
          if (state.api.loading === "pending") {
            state.api.error = action.error
            state.api.loading = "idle"
          }
        }
      )
      .addCase(
        trackers_customer_tracker_inputs_create.pending,
        (state, action) => {
          if (state.api.loading === "idle") {
            state.api.loading = "pending"
          }
        }
      )
      .addCase(
        trackers_customer_tracker_inputs_create.fulfilled,
        (state, action) => {
          if (state.api.loading === "pending") {
            state.entities.push(action.payload)
            state.api.loading = "idle"
          }
        }
      )
      .addCase(
        trackers_customer_tracker_inputs_create.rejected,
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
  trackers_customer_tracker_active_read,
  trackers_customer_tracker_inputs_create,
  slice: customerTrackerSerializerWithJobProcessesSlice
}
