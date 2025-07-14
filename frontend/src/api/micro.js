import request from './request'

/**
 * 获取某一天的日程
 * @param {string} date - 日期（格式：yyyy-MM-dd）
 * @returns {Promise<Object>} 日程数据
 * {
 *   date: "2025-07-12",
 *   schedule: [
 *     { hour: 9, minute: 0, event: "会议", place: "会议室", note: "带资料" },
 *     ...
 *   ],
 *   todos: ["任务1", "任务2"]
 * }
 */
export function getDailySchedule(date) {
  return request.get(`/micro/daily?date=${date}`)
}

/**
 * 新建或修改某一天的日程
 * @param {Object} data
 * @param {string} data.date - 日期
 * @param {Array} data.schedule - 安排列表
 * @param {Array} data.todos - 待办事项列表
 * @returns {Promise<Object>} 保存结果
 */
export function saveDailySchedule(data) {
  return request.post('/micro/save', data)
}

/**
 * 创建某日的空白日程
 * @param {Object} data - 日程数据
 * @param {string} data.date - 日期
 * @returns {Promise<Object>} 创建结果
 */
export function createEmptySchedule(data) {
  return request.post('/api/schedules', data)
}

/**
 * 添加日程条目
 * @param {Object} data - 日程条目数据
 * @returns {Promise<Object>} 添加结果
 */
export function addScheduleItem(data) {
  return request.post('/schedule/items', data)
}

/**
 * 更新日程条目
 * @param {number} id - 条目 ID
 * @param {Object} data - 日程条目数据
 * @returns {Promise<Object>} 更新结果
 */
export function updateScheduleItem(id, data) {
  return request.put(`/schedule/items/${id}`, data)
}

/**
 * 删除日程条目
 * @param {number} id - 条目 ID
 * @returns {Promise<Object>} 删除结果
 */
export function deleteScheduleItem(id) {
  return request.delete(`/schedule/items/${id}`)
}

/**
 * 添加待办
 * @param {Object} data - 待办数据
 * @returns {Promise<Object>} 添加结果
 */
export function addTodo(data) {
  return request.post('/todos', data)
}

/**
 * 更新待办状态
 * @param {number} id - 待办 ID
 * @param {Object} data - 待办状态数据
 * @returns {Promise<Object>} 更新结果
 */
export function updateTodoStatus(id, data) {
  return request.put(`/todos/${id}`, data)
}

/**
 * 删除待办
 * @param {number} id - 待办 ID
 * @returns {Promise<Object>} 删除结果
 */
export function deleteTodo(id) {
  return request.delete(`/todos/${id}`)
}
