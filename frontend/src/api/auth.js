import request from './request'

/**
 * 用户登录
 * @param {Object} data - 登录信息
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @returns {Promise<Object>} 响应数据
 * {
 *   success: true,
 *   token: "xxxxx"
 * }
 */
export function login(data) {
  return request.post('/login', data)
}

/**
 * 用户注册
 * @param {Object} data - 注册信息
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @param {string} [data.email] - 邮箱（可选）
 * @returns {Promise<Object>} 响应数据
 */
export function register(data) {
  return request.post('/register', data)
}

/**
 * 获取当前用户信息
 * @returns {Promise<Object>} 用户信息
 */
export function getUserInfo() {
  return request.get('/user')
}
