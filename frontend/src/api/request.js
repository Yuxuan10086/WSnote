import axios from 'axios'

// 创建 axios 实例
const service = axios.create({
  baseURL: 'http://localhost:8000/api', // 根地址，统一配置
  timeout: 5000, // 请求超时
  headers: { 'Content-Type': 'application/json' },
  responseType: 'json',
})

// 请求拦截器（可选）
service.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器（可选）
service.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('请求出错：', error)
    return Promise.reject(error)
  },
)

export default service
