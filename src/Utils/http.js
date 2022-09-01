import axios from 'axios';

import { Config } from '@/Config'

const APP_PLATFORM = 'Mobile';

export const request = axios.create({
  headers: {
    app_platform: APP_PLATFORM,
    app_version: 1,
  },
});


// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401) {
//       // dispatch something to your store
//     }

//     return Promise.reject(error);
//   }
// )

export function setupHttpConfig () {
  request.defaults.baseURL = Config.API_DEV_URL;
  request.defaults.timeout = 10000;
  axios.defaults.headers['Content-Type'] = 'application/json';
  // request.defaults.xsrfHeaderName = "X-CSRFToken";
  // request.defaults.xsrfCookieName = "csrftoken";
  // you can add more default values for http requests here
}

export function addTokenToHttp (token) {
  return new Promise((resolve) => {
    // do something asynchronous which eventually calls either:
    if (token) {
      request.defaults.headers.Authorization = `Token ${token}`;
      resolve();
    } else {
      request.defaults.headers.Authorization = '';
      resolve();
    }
  });
}