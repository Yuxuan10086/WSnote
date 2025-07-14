<template>
  <PageHeader v-if="isLogin" />
  <div class="contentBackground">
    <RouterView />
  </div>
</template>

<script lang="js">
import { useUserStore } from '@/stores/user'
import PageHeader from '@/components/PageHeader.vue'

export default {
  components: {
    PageHeader,
  },
  data() {
    return {
      isLogin: false,
    }
  },
  created() {
    const userStore = useUserStore()
    this.isLogin = userStore.isLoggedIn
    console.log(userStore.isLoggedIn, userStore.userName)
  },
}
</script>

<style scoped>
.contentBackground {
  background-color: var(--gray-light);
  width: 100%;
  min-height: 100vh;
}
</style>
