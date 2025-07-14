<template>
  <header class="phground">
    <div class="ph">
      <div class="title">
        <h1>WSnote</h1>
      </div>

      <div class="switch">
        <input type="checkbox" id="mode-switch" v-model="isMicroMode" @click="switchTo" />
        <label for="mode-switch">
          <span class="mode-text left">宏观日程</span>
          <span class="slider"></span>
          <span class="mode-text right">微观日程</span>
        </label>
      </div>

      <div class="userInfo">
        {{ userName }}
      </div>
    </div>
  </header>
  <hr
    style="color: gray; background-color: var(--gray-dark); border: none; height: 1px; margin: 0"
  />
</template>

<script lang="js">
import { useUserStore } from '@/stores/user'
export default {
  name: 'PageHeader',
  data() {
    return {
      isLogin: false,
      userName: '',
      isMicroMode: false,
    }
  },
  methods: {
    switchTo() {
      if (this.isMicroMode) this.$router.push('/micro')
      else this.$router.push('/macro')
      console.log(this.isMicroMode)
    },
  },
  created() {
    const userStore = useUserStore()
    this.isLogin = userStore.isLoggedIn
    this.userName = userStore.userName
  },
}
</script>

<style scoped>
@import '@/assets/main.css';
</style>
<style>
body {
  margin: 0;
  padding: 0;
}
.phground {
  background-color: var(--background);
  width: 100%;
  margin: 0;
  padding: 0;
}
.ph {
  display: flex;
  margin: 0;
  align-items: center;
  padding: 0;
}
.title {
  flex: 0 1 auto;
  margin-left: 25px;
}
.switch {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

#mode-switch {
  display: none;
}

#mode-switch + label {
  position: relative;
  width: 160px;
  height: 40px;
  background-color: var(--primary-lighter);
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

#mode-switch + label .slider {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 75.5px;
  height: 36px;
  background-color: var(--foreground);
  border-radius: 6px;
  box-shadow: var(--shadow);
  transition: transform 0.3s;
  z-index: 1;
}

#mode-switch:checked + label {
  background-color: var(--primary-light);
}

#mode-switch:checked + label .slider {
  transform: translateX(81px);
}

#mode-switch + label .mode-text {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16.5px;
  font-weight: 600;
  color: var(--primary-darker);
  z-index: 0;
}

#mode-switch + label .mode-text.left {
  left: 12px;
}

#mode-switch + label .mode-text.right {
  right: 12px;
}

.userInfo {
  flex: 0 1 auto;
  text-align: right;
  margin-right: 25px;
  font-size: 20px;
}
</style>
