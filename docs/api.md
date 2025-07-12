# WSnote系统 API 文档

---

## 1. 用户模块

### 注册

**POST** `/api/register`  
**功能**：注册新用户  

**请求体（JSON）**：
```json
{
  "username": "zhangsan",     // 必填
  "password": "123456",       // 必填
  "email": "zhangsan@example.com"  // 选填
}
```

---

### 登录

**POST** `/api/login`  
**功能**：用户登录，返回 token  

**请求体（JSON）**：
```json
{
  "username": "zhangsan",    // 必填
  "password": "123456"       // 必填
}
```

**响应示例**：
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### 获取当前用户信息

**GET** `/api/user`  
**功能**：获取当前登录用户信息  

**请求头**：
```
Authorization: Bearer <token>
```

---

## 2. 甘特图项目（宏观日程）

### 获取所有甘特图项目

**GET** `/api/gantt/projects`  
**功能**：获取当前用户的所有甘特图项目  

**请求头**：
```
Authorization: Bearer <token>
```

---

### 创建甘特图项目

**POST** `/api/gantt/projects`  
**功能**：新建甘特图项目  

**请求体（JSON）**：
```json
{
  "name": "2025创业规划"   // 必填
}
```

---

### 删除甘特图项目

**DELETE** `/api/gantt/projects/{id}`  
**功能**：删除项目（连同子任务）  

**路径参数**：
- `id`：项目ID

---

## 3. 甘特图任务

### 获取项目中的所有任务

**GET** `/api/gantt/tasks?projectId=1`  
**功能**：获取某甘特项目中的任务列表  

**查询参数**：
- `projectId`：项目ID（必填）

---

### 创建任务

**POST** `/api/gantt/tasks`  
**功能**：添加新任务  

**请求体（JSON）**：
```json
{
  "projectId": 1,             // 必填
  "name": "UI设计",
  "startDate": "2025-07-12",  // 可选
  "endDate": "2025-07-20",    // 可选
  "duration": 5,              // 可选（天数），和 endDate 至少填一项
  "color": "blue",            // 选填，支持：blue/green/orange/purple/gray
  "notes": "参考shadcn风格"
}
```

---

### 更新任务

**PUT** `/api/gantt/tasks/{id}`  
**功能**：更新任务内容或时间（如拖动条形图）  

**路径参数**：
- `id`：任务ID  

**请求体（JSON）**（字段可选）：
```json
{
  "name": "UI设计优化",
  "startDate": "2025-07-13",
  "endDate": "2025-07-22",
  "progress": 70,
  "notes": "已初步完成"
}
```

---

### 删除任务

**DELETE** `/api/gantt/tasks/{id}`  
**功能**：删除单个任务  

**路径参数**：
- `id`：任务ID

---

## 4. 微观日程（每天的表格安排）

### 获取某日的日程（含任务和待办）

**GET** `/api/schedules?date=2025-07-12`  
**功能**：获取某天的日程，包括所有条目与待办  

**查询参数**：
- `date`：日期（格式 `YYYY-MM-DD`，必填）

---

### 创建某日的空白日程

**POST** `/api/schedules`  
**功能**：创建指定日期的日程（未来或过去）  

**请求体（JSON）**：
```json
{
  "date": "2025-07-13"
}
```

---

## 5. 微观日程条目（表格）

### 添加日程条目

**POST** `/api/schedule/items`  
**功能**：添加表格中的一项日程条目  

**请求体（JSON）**：
```json
{
  "scheduleId": 12,        // 必填
  "hour": 9,
  "minute": 30,
  "event": "开会",
  "location": "A101",
  "notes": "项目启动会"
}
```

---

### 更新日程条目

**PUT** `/api/schedule/items/{id}`  
**功能**：修改条目  

**路径参数**：
- `id`：条目ID  

**请求体（JSON）**（字段可选）：
```json
{
  "event": "改为电话会议",
  "location": "线上"
}
```

---

### 删除条目

**DELETE** `/api/schedule/items/{id}`  
**功能**：删除条目  

**路径参数**：
- `id`：条目ID

---

## 6. 待办清单

### 添加待办

**POST** `/api/todos`  
**功能**：为某日添加一个待办任务  

**请求体（JSON）**：
```json
{
  "scheduleId": 12,           // 必填
  "content": "整理会议纪要"
}
```

---

### 更新待办状态

**PUT** `/api/todos/{id}`  
**功能**：完成/取消完成某个待办  

**路径参数**：
- `id`：待办ID  

**请求体（JSON）**：
```json
{
  "isDone": true
}
```

---

### 删除待办

**DELETE** `/api/todos/{id}`  
**功能**：删除待办项  

**路径参数**：
- `id`：待办ID

---

## 鉴权说明

除了 `/login` 和 `/register`，其余所有 API 均需在请求头加入：

```
Authorization: Bearer <token>
```
