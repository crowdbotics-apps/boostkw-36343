import { request } from '../../../util/http'

function getProfile() {
  return request
    .get('accounts/profile/')
    .then(res => {
      return res.data
    })
    .catch(function (error) {
      console.log('error=>', error)
      throw error
    })
}

export const profileAPIService = {
  getProfile,
}
