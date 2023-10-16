import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const feedbacks_user_feedback_read = createAsyncThunk(
  "userFeedbackCreates/feedbacks_user_feedback_read",
  async payload => {
    const response = await apiService.feedbacks_user_feedback_read(payload)
    return response.data
  }
)
export const feedbacks_user_feedback_create = createAsyncThunk(
  "userFeedbackCreates/feedbacks_user_feedback_create",
  async payload => {
    const response = await apiService.feedbacks_user_feedback_create(payload)
    return response.data
  }
)
export const feedbacks_user_feedback_update = createAsyncThunk(
  "userFeedbackCreates/feedbacks_user_feedback_update",
  async payload => {
    const response = await apiService.feedbacks_user_feedback_update(payload)
    return response.data
  }
)
export const feedbacks_user_feedback_partial_update = createAsyncThunk(
  "userFeedbackCreates/feedbacks_user_feedback_partial_update",
  async payload => {
    const response = await apiService.feedbacks_user_feedback_partial_update(
      payload
    )
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const userFeedbackCreatesSlice = createSlice({
  name: "userFeedbackCreates",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(feedbacks_user_feedback_read.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(feedbacks_user_feedback_read.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = [
            ...state.entities.filter(record => record.id !== action.payload.id),
            action.payload
          ]
          state.api.loading = "idle"
        }
      })
      .addCase(feedbacks_user_feedback_read.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(feedbacks_user_feedback_create.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(feedbacks_user_feedback_create.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities.push(action.payload)
          state.api.loading = "idle"
        }
      })
      .addCase(feedbacks_user_feedback_create.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(feedbacks_user_feedback_update.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(feedbacks_user_feedback_update.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = state.entities.map(record =>
            record.id === action.payload.id ? action.payload : record
          )
          state.api.loading = "idle"
        }
      })
      .addCase(feedbacks_user_feedback_update.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(
        feedbacks_user_feedback_partial_update.pending,
        (state, action) => {
          if (state.api.loading === "idle") {
            state.api.loading = "pending"
          }
        }
      )
      .addCase(
        feedbacks_user_feedback_partial_update.fulfilled,
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
        feedbacks_user_feedback_partial_update.rejected,
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
  feedbacks_user_feedback_read,
  feedbacks_user_feedback_create,
  feedbacks_user_feedback_update,
  feedbacks_user_feedback_partial_update,
  slice: userFeedbackCreatesSlice
}
