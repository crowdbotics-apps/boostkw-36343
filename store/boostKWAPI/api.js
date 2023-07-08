import axios from "axios"
const boostKWAPI = axios.create({
  baseURL: "https://boostkw-36343.botics.co",
  headers: { Accept: "application/json", "Content-Type": "application/json" }
})
function accounts_delete_create(payload) {
  return boostKWAPI.post(`/accounts/delete/`)
}
function accounts_login_token_create(payload) {
  return boostKWAPI.post(`/accounts/login/token/`, payload.data)
}
function accounts_logout_list(payload) {
  return boostKWAPI.get(`/accounts/logout/`)
}
function accounts_logout_create(payload) {
  return boostKWAPI.post(`/accounts/logout/`)
}
function accounts_password_change_create(payload) {
  return boostKWAPI.post(`/accounts/password/change/`, payload.data)
}
function accounts_password_reset_create(payload) {
  return boostKWAPI.post(`/accounts/password/reset/`, payload.data)
}
function accounts_password_reset_confirm_create(payload) {
  return boostKWAPI.post(`/accounts/password/reset/confirm/`, payload.data)
}
function accounts_profile_read(payload) {
  return boostKWAPI.get(`/accounts/profile/`)
}
function accounts_profile_update(payload) {
  return boostKWAPI.put(`/accounts/profile/`, payload.data)
}
function accounts_profile_partial_update(payload) {
  return boostKWAPI.patch(`/accounts/profile/`, payload.data)
}
function accounts_registration_resend_email_create(payload) {
  return boostKWAPI.post(`/accounts/registration/resend-email/`, payload.data)
}
function accounts_registration_verify_email_create(payload) {
  return boostKWAPI.post(`/accounts/registration/verify-email/`, payload.data)
}
function accounts_signup_create(payload) {
  return boostKWAPI.post(`/accounts/signup/`, payload.data)
}
function crews_list(payload) {
  return boostKWAPI.get(`/crews/`, {
    params: { ordering: payload.ordering, search: payload.search }
  })
}
function feedbacks_user_feedback_read(payload) {
  return boostKWAPI.get(`/feedbacks/user-feedback/`)
}
function feedbacks_user_feedback_create(payload) {
  return boostKWAPI.post(`/feedbacks/user-feedback/`, payload.data)
}
function feedbacks_user_feedback_update(payload) {
  return boostKWAPI.put(`/feedbacks/user-feedback/`, payload.data)
}
function feedbacks_user_feedback_partial_update(payload) {
  return boostKWAPI.patch(`/feedbacks/user-feedback/`, payload.data)
}
function roofs_types_list(payload) {
  return boostKWAPI.get(`/roofs/types/`, {
    params: {
      ordering: payload.ordering,
      search: payload.search,
      page: payload.page
    }
  })
}
function trackers_customer_tracker_active_read(payload) {
  return boostKWAPI.get(`/trackers/customer-tracker-active/`)
}
function trackers_customer_tracker_inputs_list(payload) {
  return boostKWAPI.get(`/trackers/customer-tracker-inputs/`, {
    params: {
      status: payload.status,
      is_battery: payload.is_battery,
      crew: payload.crew,
      roof_type: payload.roof_type,
      location: payload.location,
      ordering: payload.ordering,
      search: payload.search,
      page: payload.page
    }
  })
}
function trackers_customer_tracker_inputs_create(payload) {
  return boostKWAPI.post(`/trackers/customer-tracker-inputs/`, payload.data)
}
function trackers_customer_tracker_inputs_read(payload) {
  return boostKWAPI.get(`/trackers/customer-tracker-inputs/${payload.id}/`)
}
function trackers_customer_tracker_inputs_update(payload) {
  return boostKWAPI.put(
    `/trackers/customer-tracker-inputs/${payload.id}/`,
    payload.data
  )
}
function trackers_customer_tracker_inputs_partial_update(payload) {
  return boostKWAPI.patch(
    `/trackers/customer-tracker-inputs/${payload.id}/`,
    payload.data
  )
}
function trackers_customer_tracker_inputs_delete(payload) {
  return boostKWAPI.delete(`/trackers/customer-tracker-inputs/${payload.id}/`)
}
function trackers_customer_tracker_inputs_job_processes_list(payload) {
  return boostKWAPI.get(
    `/trackers/customer-tracker-inputs/${payload.id}/job-processes/`,
    { params: { ordering: payload.ordering, search: payload.search } }
  )
}
function trackers_customer_tracker_inputs_job_processes_create(payload) {
  return boostKWAPI.post(
    `/trackers/customer-tracker-inputs/${payload.id}/job-processes/`,
    payload.data
  )
}
function trackers_customer_tracker_inputs_job_processes_read(payload) {
  return boostKWAPI.get(
    `/trackers/customer-tracker-inputs/${payload.id}/job-processes/${payload.job_process_id}/`
  )
}
function trackers_customer_tracker_inputs_job_processes_update(payload) {
  return boostKWAPI.put(
    `/trackers/customer-tracker-inputs/${payload.id}/job-processes/${payload.job_process_id}/`,
    payload.data
  )
}
function trackers_customer_tracker_inputs_job_processes_partial_update(
  payload
) {
  return boostKWAPI.patch(
    `/trackers/customer-tracker-inputs/${payload.id}/job-processes/${payload.job_process_id}/`,
    payload.data
  )
}
function trackers_customer_tracker_inputs_job_processes_delete(payload) {
  return boostKWAPI.delete(
    `/trackers/customer-tracker-inputs/${payload.id}/job-processes/${payload.job_process_id}/`
  )
}
function trackers_input_types_list(payload) {
  return boostKWAPI.get(`/trackers/input-types/`, {
    params: {
      ordering: payload.ordering,
      search: payload.search,
      page: payload.page
    }
  })
}
function trackers_job_processes_list(payload) {
  return boostKWAPI.get(`/trackers/job-processes/`, {
    params: {
      customer_tracker: payload.customer_tracker,
      status: payload.status,
      ordering: payload.ordering,
      search: payload.search,
      page: payload.page
    }
  })
}
function trackers_job_processes_create(payload) {
  return boostKWAPI.post(`/trackers/job-processes/`, payload.data)
}
function trackers_job_processes_read(payload) {
  return boostKWAPI.get(`/trackers/job-processes/${payload.id}/`)
}
function trackers_job_processes_update(payload) {
  return boostKWAPI.put(`/trackers/job-processes/${payload.id}/`, payload.data)
}
function trackers_job_processes_partial_update(payload) {
  return boostKWAPI.patch(
    `/trackers/job-processes/${payload.id}/`,
    payload.data
  )
}
function trackers_job_processes_delete(payload) {
  return boostKWAPI.delete(`/trackers/job-processes/${payload.id}/`)
}
function trackers_stats_read(payload) {
  return boostKWAPI.get(`/trackers/stats/`)
}
function trackers_stats_chart_daily_read(payload) {
  return boostKWAPI.get(`/trackers/stats/chart/daily/`)
}
export const apiService = {
  accounts_delete_create,
  accounts_login_token_create,
  accounts_logout_list,
  accounts_logout_create,
  accounts_password_change_create,
  accounts_password_reset_create,
  accounts_password_reset_confirm_create,
  accounts_profile_read,
  accounts_profile_update,
  accounts_profile_partial_update,
  accounts_registration_resend_email_create,
  accounts_registration_verify_email_create,
  accounts_signup_create,
  crews_list,
  feedbacks_user_feedback_read,
  feedbacks_user_feedback_create,
  feedbacks_user_feedback_update,
  feedbacks_user_feedback_partial_update,
  roofs_types_list,
  trackers_customer_tracker_active_read,
  trackers_customer_tracker_inputs_list,
  trackers_customer_tracker_inputs_create,
  trackers_customer_tracker_inputs_read,
  trackers_customer_tracker_inputs_update,
  trackers_customer_tracker_inputs_partial_update,
  trackers_customer_tracker_inputs_delete,
  trackers_customer_tracker_inputs_job_processes_list,
  trackers_customer_tracker_inputs_job_processes_create,
  trackers_customer_tracker_inputs_job_processes_read,
  trackers_customer_tracker_inputs_job_processes_update,
  trackers_customer_tracker_inputs_job_processes_partial_update,
  trackers_customer_tracker_inputs_job_processes_delete,
  trackers_input_types_list,
  trackers_job_processes_list,
  trackers_job_processes_create,
  trackers_job_processes_read,
  trackers_job_processes_update,
  trackers_job_processes_partial_update,
  trackers_job_processes_delete,
  trackers_stats_read,
  trackers_stats_chart_daily_read
}
