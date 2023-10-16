import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const trackers_customer_tracker_inputs_job_processes_list = createAsyncThunk(
  "jobProcessLists/trackers_customer_tracker_inputs_job_processes_list",
  async payload => {
    const response = await apiService.trackers_customer_tracker_inputs_job_processes_list(
      payload
    )
    return response.data
  }
)
export const trackers_customer_tracker_inputs_job_processes_create = createAsyncThunk(
  "jobProcessLists/trackers_customer_tracker_inputs_job_processes_create",
  async payload => {
    const response = await apiService.trackers_customer_tracker_inputs_job_processes_create(
      payload
    )
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const jobProcessListsSlice = createSlice({
  name: "jobProcessLists",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        trackers_customer_tracker_inputs_job_processes_list.pending,
        (state, action) => {
          if (state.api.loading === "idle") {
            state.api.loading = "pending"
          }
        }
      )
      .addCase(
        trackers_customer_tracker_inputs_job_processes_list.fulfilled,
        (state, action) => {
          if (state.api.loading === "pending") {
            state.entities = action.payload
            state.api.loading = "idle"
          }
        }
      )
      .addCase(
        trackers_customer_tracker_inputs_job_processes_list.rejected,
        (state, action) => {
          if (state.api.loading === "pending") {
            state.api.error = action.error
            state.api.loading = "idle"
          }
        }
      )
      .addCase(
        trackers_customer_tracker_inputs_job_processes_create.pending,
        (state, action) => {
          if (state.api.loading === "idle") {
            state.api.loading = "pending"
          }
        }
      )
      .addCase(
        trackers_customer_tracker_inputs_job_processes_create.fulfilled,
        (state, action) => {
          if (state.api.loading === "pending") {
            state.entities.push(action.payload)
            state.api.loading = "idle"
          }
        }
      )
      .addCase(
        trackers_customer_tracker_inputs_job_processes_create.rejected,
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
  trackers_customer_tracker_inputs_job_processes_list,
  trackers_customer_tracker_inputs_job_processes_create,
  slice: jobProcessListsSlice
}
