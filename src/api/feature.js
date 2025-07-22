import axios from 'axios'

export function getTlsData(url) {
  return axios({
    url: url,
    method: 'get'
  })
}
