import request from './request'

/**
 * 获取当前用户的所有甘特图列表
 * @returns {Promise<Array>} 甘特图数组
 * [{
 *   id: 1,
 *   name: "甘特图A",
 *   tasks: [...任务列表...]
 * }]
 */
export function getGanttList() {
  return request.get('/macro/list')
}

/**
 * 新增一个甘特图任务
 * @param {Object} data - 任务数据
 * @param {string} data.name - 任务名称
 * @param {string} data.start - 开始时间（格式：yyyy-MM-dd）
 * @param {string} [data.end] - 结束时间（可选）
 * @param {number} [data.duration] - 工期（单位：天，可选）
 * @param {string} [data.note] - 备注
 * @param {string} [data.color] - 显示颜色，如：'#409eff'
 * @returns {Promise<Object>} 创建成功后的任务
 */
export function addGanttTask(data) {
  return request.post('/macro/add', data)
}

/**
 * 修改某个任务的时间（拖拽更新）
 * @param {Object} data
 * @param {number} data.taskId - 任务 ID
 * @param {string} data.start - 新开始时间
 * @param {string} data.end - 新结束时间
 * @returns {Promise<Object>} 更新结果
 */
export function updateGanttTime(data) {
  return request.post('/macro/update-time', data)
}

/**
 * 创建甘特图项目
 * @param {Object} data - 项目数据
 * @param {string} data.name - 项目名称
 * @returns {Promise<Object>} 创建成功后的项目
 */
export function createGanttProject(data) {
  return request.post('/gantt/projects', data)
}

/**
 * 删除甘特图项目
 * @param {number} id - 项目 ID
 * @returns {Promise<Object>} 删除结果
 */
export function deleteGanttProject(id) {
  return request.delete(`/gantt/projects/${id}`)
}

/**
 * 获取项目中的所有任务
 * @param {number} projectId - 项目 ID
 * @returns {Promise<Array>} 任务列表
 */
export function getGanttTasks(projectId) {
  return request.get(`/gantt/tasks?projectId=${projectId}`)
}

/**
 * 删除单个任务
 * @param {number} id - 任务 ID
 * @returns {Promise<Object>} 删除结果
 */
export function deleteGanttTask(id) {
  return request.delete(`/gantt/tasks/${id}`)
}

/**
 * 更新任务内容或时间
 * @param {number} id - 任务 ID
 * @param {Object} data - 任务数据
 * @returns {Promise<Object>} 更新结果
 */
export function updateGanttTask(id, data) {
  return request.put(`/gantt/tasks/${id}`, data)
}
