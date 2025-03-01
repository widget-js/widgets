import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import axios from 'axios'

import qs from 'qs'

import { LogApi } from '@widget-js/core'

axios.defaults.baseURL = 'https://widgetjs.cn/api/v1'
const widgetServerApi: AxiosInstance = axios.create({
  timeout: 60000,
})

// request拦截器
widgetServerApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (
      config.method === 'post'
      && (config.headers as AxiosRequestHeaders)['Content-Type'] === 'application/x-www-form-urlencoded'
    ) {
      config.data = qs.stringify(config.data)
    }
    if (config.method === 'get' && config.params) {
      let url = config.url as string
      url += '?'
      const keys = Object.keys(config.params)
      for (const key of keys) {
        if (config.params[key] !== void 0 && config.params[key] !== null) {
          url += `${key}=${encodeURIComponent(config.params[key])}&`
        }
      }
      url = url.substring(0, url.length - 1)
      config.params = {}
      config.url = url
    }
    return config
  },
  (error: AxiosError) => {
    LogApi.error('axios', {
      code: error.code,
      message: error.message,
      name: error.name,
    })
    return Promise.reject(error)
  },
)

// response 拦截器
widgetServerApi.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    if (response.config.responseType === 'blob') {
      // 如果是文件流，直接过
      return response
    }
    else if (response.data.code === 200) {
      return response.data.data
    }
    else {
      return Promise.reject(response.data)
    }
  },
  (error: AxiosError) => {
    LogApi.error('axios', {
      code: error.code,
      message: error.message,
      name: error.name,
    })
    return Promise.reject(error)
  },
)

export { widgetServerApi }
