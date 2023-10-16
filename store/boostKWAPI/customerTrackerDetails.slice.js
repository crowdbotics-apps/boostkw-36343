import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const trackers_customer_tracker_inputs_read = createAsyncThunk(
  "customerTrackerDetails/trackers_customer_tracker_inputs_read",
  async payload => {
    const response = await apiService.trackers_customer_tracker_inputs_read(
      payload
    )
    return response.data
  }
)
export const trackers_customer_tracker_inputs_update = createAsyncThunk(
  "customerTrackerDetails/trackers_customer_tracker_inputs_update",
  async payload => {
    const response = await apiService.trackers_customer_tracker_inputs_update(
      payload
    )
    return response.data
  }
)
export const trackers_customer_tracker_inputs_partial_update = createAsyncThunk(
  "customerTrackerDetails/trackers_customer_tracker_inputs_partial_update",
  async payload => {
    const response = await apiService.trackers_customer_tracker_inputs_partial_update(
      payload
    )
    return response.data
  }
)
export const trackers_customer_tracker_inputs_delete = createAsyncThunk(
  "customerTrackerDetails/trackers_customer_tracker_inputs_delete",
  async payload => {
    const response = await apiService.trackers_customer_tracker_inputs_delete(
      payload
    )
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const customerTrackerDetailsSlice = createSlice({
  name: "customerTrackerDetails",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        trackers_customer_tracker_inputs_read.pending,
        (state, action) => {
          if (state.api.loading === "idle") {
            state.api.loading = "pending"
          }
        }
      )
      .addCase(
        trackers_customer_tracker_inputs_read.fulfilled,
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
        trackers_customer_tracker_inputs_read.rejected,
        (state, action) => {
          if (state.api.loading === "pending") {
            state.api.error = action.error
            state.api.loading = "idle"
          }
        }
      )
      .addCase(
        trackers_customer_tracker_inputs_update.pending,
        (state, action) => {
          if (state.api.loading === "idle") {
            state.api.loading = "pending"
          }
        }
      )
      .addCase(
        trackers_customer_tracker_inputs_update.fulfilled,
        (state, action) => {
          if (state.api.loading === "pending") {
            state.entities = state.entities.map(record =>
              record.id === action.payload.id ? action.payload : record
            )
            state.api.loading = "idle"
          }
        }
      )
      .addCase(
        trackers_customer_tracker_inputs_update.rejected,
        (state, action) => {
          if (state.api.loading === "pending") {
            state.api.error = action.error
            state.api.loading = "idle"
          }
        }
      )
      .addCase(
        trackers_customer_tracker_inputs_partial_update.pending,
        (state, action) => {
          if (state.api.loading === "idle") {
            state.api.loading = "pending"
          }
        }
      )
      .addCase(
        trackers_customer_tracker_inputs_partial_update.fulfilled,
        (state, action) => {
          if (state.api.loading === "pending") {
            state.entities = state.entities.map(record =>
              record.id === action.payload.id ? action.payload : record
            )
            state.api.loading = "idle"
          }
        }
      )
      .addCase(
        trackers_customer_tracker_inputs_partial_update.rejected,
        (state, action) => {
          if (state.api.loading === "pending") {
            state.api.error = action.error
            state.api.loading = "idle"
          }
        }
      )
      .addCase(
        trackers_customer_tracker_inputs_delete.pending,
        (state, action) => {
          if (state.api.loading === "idle") {
            state.api.loading = "pending"
          }
        }
      )
      .addCase(
        trackers_customer_tracker_inputs_delete.fulfilled,
        (state, action) => {
          if (state.api.loading === "pending") {
            state.entities = state.entities.filter(
              record => record.id !== action.meta.arg?.id
            )
            state.api.loading = "idle"
          }
        }
      )
      .addCase(
        trackers_customer_tracker_inputs_delete.rejected,
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
  trackers_customer_tracker_inputs_read,
  trackers_customer_tracker_inputs_update,
  trackers_customer_tracker_inputs_partial_update,
  trackers_customer_tracker_inputs_delete,
  slice: customerTrackerDetailsSlice
}
