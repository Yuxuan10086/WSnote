<template>
  <div class="gantt-container">
    <!-- 三层时间轴 -->
    <div class="gantt-header">
      <div class="header-row">
        <div v-for="(date, index) in dates" :key="'week-' + index" class="header-cell">
          第{{ getWeekNumber(date) }}周
        </div>
      </div>
      <div class="header-row">
        <div v-for="(date, index) in dates" :key="'weekday-' + index" class="header-cell">
          周{{ getWeekdayLabel(date) }}
        </div>
      </div>
      <div class="header-row">
        <div v-for="(date, index) in dates" :key="'date-' + index" class="header-cell">
          {{ getDateLabel(date) }}
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="gantt-body" ref="body" @scroll="syncScroll">
      <div class="gantt-sidebar">
        <div v-for="task in tasks" :key="task.id" class="sidebar-row">
          <div class="task-name">{{ task.name }}</div>
          <div class="task-progress">{{ task.progress }}%</div>
        </div>
      </div>

      <div class="gantt-chart" ref="chart">
        <div v-for="task in tasks" :key="task.id" class="chart-row">
          <div class="bar" :style="getBarStyle(task)" :title="task.name">
            {{ task.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
dayjs.extend(isoWeek)

export default {
  props: {
    tasks: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  name: 'BasicGanttChart',
  data() {
    const today = dayjs()
    const days = Array.from({ length: 14 }, (_, i) => today.add(i, 'day'))
    return {
      dates: days,
      firstWeek: 28, // 规定一年中的第几周为本表的第一周
    }
  },
  methods: {
    getWeekNumber(date) {
      return dayjs(date).isoWeek() - this.firstWeek + 1
    },
    getWeekdayLabel(date) {
      return '日一二三四五六'[dayjs(date).day()] // day: 0~6
    },
    getDateLabel(date) {
      const d = dayjs(date)
      return `${d.month() + 1}月${d.date()}日`
    },
    getBarStyle(task) {
      const startIndex = this.dates.findIndex((d) => dayjs(d).isSame(task.start, 'day'))
      const endIndex = this.dates.findIndex((d) => dayjs(d).isSame(task.end, 'day'))
      const width = (endIndex - startIndex + 1) * 80 + 'px'
      const left = startIndex * 80 + 'px'
      return {
        width,
        left,
        backgroundColor: task.color,
      }
    },
    syncScroll() {
      const chart = this.$refs.chart
      const sidebar = this.$refs.body.querySelector('.gantt-sidebar')
      sidebar.scrollTop = this.$refs.body.scrollTop
      chart.scrollTop = this.$refs.body.scrollTop
    },
  },
}
</script>

<style scoped>
.gantt-container {
  overflow-x: auto; /* 外部容器可横向滚动 */
  border: 1px solid #ccc;
  font-size: 12px;
  font-family: sans-serif;
}

.gantt-header {
  display: flex;
  flex-direction: column;
  min-width: max-content; /* 添加 */
}

.header-row {
  display: flex;
  min-width: max-content; /* 添加 */
}

.header-cell {
  min-width: 80px;
  text-align: center;
  padding: 4px;
  border-right: 1px solid #ddd;
  background: #f9f9f9;
}

.gantt-body {
  display: flex;
  max-height: 200px;
  overflow-y: auto; /* 只允许纵向滚动 */
  overflow-x: hidden; /* 禁止横向滚动 */
  border-top: 1px solid #ccc;
}

.gantt-sidebar {
  min-width: 160px;
  background: #f4f4f4;
  border-right: 1px solid #ccc;
}

.sidebar-row {
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.task-name {
  font-weight: bold;
}

.task-progress {
  font-size: 11px;
  color: #888;
}

.gantt-chart {
  position: relative;
  flex-grow: 1;
  min-width: max-content; /* 添加，保持和header一致 */
}

.chart-row {
  position: relative;
  height: 40px;
  border-bottom: 1px solid #eee;
}

.bar {
  position: absolute;
  height: 24px;
  top: 8px;
  color: #fff;
  font-size: 12px;
  line-height: 24px;
  padding-left: 6px;
  border-radius: 4px;
  white-space: nowrap;
  overflow: hidden;
}
</style>
