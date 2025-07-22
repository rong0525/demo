import axios from 'axios'
import CancelToken from '@/utils/cancel-token';
const request = axios.create({
  withCredentials: false
})

request.interceptors.request.use(
  config => {
  // 请求开始前，检查一下是否已经有该请求了，有则取消掉该请求
//   CancelToken.removePending(config)
  // 把当前请求添加进去
  CancelToken.addPending(config)
    return config
  },
  error => {
    console.log('error', error)
    return Promise.reject(new Error(error).message)
  }
)

// request.interceptors.response.use(
//   response => {
//   // 接口响应之后把这次请求清除
//   CancelToken.removePending(response.config)
//     console.log('接口响应，清除请求.....', response)
//     return response
//   },
//   error => {
//     console.log('error', error)
//     return Promise.reject(new Error(error).message)
//   }
// )

export default request
