import axios from 'axios'
import {authProvider} from '../authProvider'

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
})



export default instance
