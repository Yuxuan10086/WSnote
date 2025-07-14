<template>
  <GanttChart :tasks="tasks" />
  <!-- <GanttChart /> -->
</template>

<script>
import GanttChart from '@/components/GanttChart.vue'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
dayjs.extend(isoWeek)
export default {
  name: 'MacroSchedule',
  components: {
    GanttChart,
  },
  data() {
    const today = dayjs()
    const days = Array.from({ length: 14 }, (_, i) => today.add(i, 'day'))
    return {
      tasks: [
        {
          id: 1,
          name: '需求分析',
          start: today.format('YYYY-MM-DD'),
          end: today.add(4, 'day').format('YYYY-MM-DD'),
          progress: 30,
          color: '#017fbc',
        },
        {
          id: 2,
          name: '系统设计',
          start: today.add(5, 'day').format('YYYY-MM-DD'),
          end: today.add(10, 'day').format('YYYY-MM-DD'),
          progress: 70,
          color: '#2ecc71',
        },
      ],
    }
  },
}
</script>

<style scoped>
.macro-schedule {
  padding: 20px;
}

h2 {
  margin-bottom: 16px;
}

/* 自定义任务条颜色（与 custom_class 匹配） */
.bar-blue {
  fill: #017fbc;
}

.bar-green {
  fill: #2ecc71;
}

.bar-orange {
  fill: #f39c12;
}
</style>
