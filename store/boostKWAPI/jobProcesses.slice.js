import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const trackers_customer_tracker_inputs_job_processes_read = createAsyncThunk(
  "jobProcesses/trackers_customer_tracker_inputs_job_processes_read",
  async payload => {
    const response = await apiService.trackers_customer_tracker_inputs_job_processes_read(
      payload
    )
    return response.data
  }
)
export const trackers_customer_tracker_inputs_job_processes_update = createAsyncThunk(
  "jobProcesses/trackers_customer_tracker_inputs_job_processes_update",
  async payload => {
    const response = await apiService.trackers_customer_tracker_inputs_job_processes_update(
      payload
    )
    return response.data
  }
)
export const trackers_customer_tracker_inputs_job_processes_partial_update = createAsyncThunk(
  "jobProcesses/trackers_customer_tracker_inputs_job_processes_partial_update",
  async payload => {
    const response = await apiService.trackers_customer_tracker_inputs_job_processes_partial_update(
      payload
    )
    return response.data
  }
)
export const trackers_customer_tracker_inputs_job_processes_delete = createAsyncThunk(
  "jobProcesses/trackers_customer_tracker_inputs_job_processes_delete",
  async payload => {
    const response = await apiService.trackers_customer_tracker_inputs_job_processes_delete(
      payload
    )
    return response.data
  }
)
export const trackers_job_processes_create = createAsyncThunk(
  "jobProcesses/trackers_job_processes_create",
  async payload => {
    const response = await apiService.trackers_job_processes_create(payload)
    return response.data
  }
)
export const trackers_job_processes_read = createAsyncThunk(
  "jobProcesses/trackers_job_processes_read",
  async payload => {
    const response = await apiService.trackers_job_processes_read(payload)
    return response.data
  }
)
export const trackers_job_processes_update = createAsyncThunk(
  "jobProcesses/trackers_job_processes_update",
  async payload => {
    const response = await apiService.trackers_job_processes_update(payload)
    return response.data
  }
)
export const trackers_job_processes_partial_update = createAsyncThunk(
  "jobProcesses/trackers_job_processes_partial_update",
  async payload => {
    const response = await apiService.trackers_job_processes_partial_update(
      payload
    )
    return response.data
  }
)
export const trackers_job_processes_delete = createAsyncThunk(
  "jobProcesses/trackers_job_processes_delete",
  async payload => {
    const response = await apiService.trackers_job_processes_delete(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const jobProcessesSlice = createSlice({
  name: "jobProcesses",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        trackers_customer_tracker_inputs_job_processes_read.pending,
        (state, action) => {
          if (state.api.loading === "idle") {
            state.api.loading = "pending"
          }
        }
      )
      .addCase(
        trackers_customer_tracker_inputs_job_processes_read.fulfilled,
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
        trackers_customer_tracker_inputs_job_processes_read.rejected,
        (state, action) => {
          if (state.api.loading === "pending") {
            state.api.error = action.error
            state.api.loading = "idle"
          }
        }
      )
      .addCase(
        trackers_customer_tracker_inputs_job_processes_update.pending,
        (state, action) => {
          if (state.api.loading === "idle") {
            state.api.loading = "pending"
          }
        }
      )
      .addCase(
        trackers_customer_tracker_inputs_job_processes_update.fulfilled,
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
        trackers_customer_tracker_inputs_job_processes_update.rejected,
        (state, action) => {
          if (state.api.loading === "pending") {
            state.api.error = action.error
            state.api.loading = "idle"
          }
        }
      )
      .addCase(
        trackers_customer_tracker_inputs_job_processes_partial_update.pending,
        (state, action) => {
          if (state.api.loading === "idle") {
            state.api.loading = "pending"
          }
        }
      )
      .addCase(
        trackers_customer_tracker_inputs_job_processes_partial_update.fulfilled,
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
        trackers_customer_tracker_inputs_job_processes_partial_update.rejected,
        (state, action) => {
          if (state.api.loading === "pending") {
            state.api.error = action.error
            state.api.loading = "idle"
          }
        }
      )
      .addCase(
        trackers_customer_tracker_inputs_job_processes_delete.pending,
        (state, action) => {
          if (state.api.loading === "idle") {
            state.api.loading = "pending"
          }
        }
      )
      .addCase(
        trackers_customer_tracker_inputs_job_processes_delete.fulfilled,
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
        trackers_customer_tracker_inputs_job_processes_delete.rejected,
        (state, action) => {
          if (state.api.loading === "pending") {
            state.api.error = action.error
            state.api.loading = "idle"
          }
        }
      )
      .addCase(trackers_job_processes_create.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(trackers_job_processes_create.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities.push(action.payload)
          state.api.loading = "idle"
        }
      })
      .addCase(trackers_job_processes_create.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(trackers_job_processes_read.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(trackers_job_processes_read.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = [
            ...state.entities.filter(record => record.id !== action.payload.id),
            action.payload
          ]
          state.api.loading = "idle"
        }
      })
      .addCase(trackers_job_processes_read.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(trackers_job_processes_update.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(trackers_job_processes_update.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = state.entities.map(record =>
            record.id === action.payload.id ? action.payload : record
          )
          state.api.loading = "idle"
        }
      })
      .addCase(trackers_job_processes_update.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(
        trackers_job_processes_partial_update.pending,
        (state, action) => {
          if (state.api.loading === "idle") {
            state.api.loading = "pending"
          }
        }
      )
      .addCase(
        trackers_job_processes_partial_update.fulfilled,
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
        trackers_job_processes_partial_update.rejected,
        (state, action) => {
          if (state.api.loading === "pending") {
            state.api.error = action.error
            state.api.loading = "idle"
          }
        }
      )
      .addCase(trackers_job_processes_delete.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(trackers_job_processes_delete.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = state.entities.filter(
            record => record.id !== action.meta.arg?.id
          )
          state.api.loading = "idle"
        }
      })
      .addCase(trackers_job_processes_delete.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
  }
})
export default {
  trackers_customer_tracker_inputs_job_processes_read,
  trackers_customer_tracker_inputs_job_processes_update,
  trackers_customer_tracker_inputs_job_processes_partial_update,
  trackers_customer_tracker_inputs_job_processes_delete,
  trackers_job_processes_create,
  trackers_job_processes_read,
  trackers_job_processes_update,
  trackers_job_processes_partial_update,
  trackers_job_processes_delete,
  slice: jobProcessesSlice
}
