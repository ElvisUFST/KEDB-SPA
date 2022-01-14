import axios from 'axios'
import {authProvider} from '../authProvider'

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
})

instance.interceptors.request.use(async request => {
  try {
      let token = await authProvider.getAccessToken()
      request.headers.common['Authorization'] = `Bearer ${token.accessToken}`
      return request
  } catch (err) {
      console.log(err)
  }
}, error => {
  return Promise.reject(error.message)
})

export default instance
