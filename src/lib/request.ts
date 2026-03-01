import axios from 'axios'
import { supabase } from '@/api/supabase'

const service = axios.create({
  baseURL: 'https://widgetjs.cn/api/v1',
  timeout: 10000,
})

service.interceptors.request.use(
  async (config) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== 200) {
      return Promise.reject(new Error(res.msg || res.message || 'Error'))
    }
    return res.data
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default service
