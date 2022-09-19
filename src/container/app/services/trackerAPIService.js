import { request } from '../../../util/http'

function getRoofTypes() {
  return request
    .get('roofs/types/')
    .then(res => {
      return res.data.results
    })
    .catch(function (error) {
      console.log('error=>', error)
      throw error
    })
}

export const trackerAPIService = {
  getRoofTypes,
}
