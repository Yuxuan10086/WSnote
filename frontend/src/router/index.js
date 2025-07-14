import { createRouter, createWebHistory } from 'vue-router'
import MacroSchedule from '../views/MacroShedule.vue'
import MicroSchedule from '../views/MicroShedule.vue'
import Login from '../views/Login.vue'

import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: Login },
    { path: '/macro', component: MacroSchedule },
    { path: '/micro', component: MicroSchedule },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    const userStore = useUserStore()
    if (userStore.isLoggedIn) {
      next('/macro')
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
