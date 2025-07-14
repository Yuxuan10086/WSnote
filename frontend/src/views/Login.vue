<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <img src="@/assets/logo.png" alt="logo" class="logo" />
        <h1>登录WSnote</h1>
      </div>

      <div class="login-info">
        <div class="login-item">
          <label>用户名</label> <input v-model="userName" placeholder="手机号或邮箱" />
        </div>
        <div class="login-item">
          <label>密码</label>
          <input type="password" v-model="password" placeholder="请输入密码" />
        </div>
      </div>

      <div class="login-btn">
        <el-button class="btn" @click="login">登录</el-button>
      </div>

      <div class="error-msg" v-if="errorMsg">{{ errorMsg }}</div>
    </div>
  </div>
</template>

<script lang="js">
import { useUserStore } from '@/stores/user'
import { login } from '@/api/auth'
export default {
  data() {
    return {
      userName: '',
      password: '',
      errorMsg: '',
    }
  },
  methods: {
    async login() {
      try {
        const res = await login({
          username: this.userName,
          password: this.password,
        })
        if (res.success) {
          // 1. 调用 pinia 中的 login 方法
          const userStore = useUserStore()
          userStore.login({
            userName: this.userName,
            token: res.token,
          })

          // 2. 可选：保存到 localStorage
          localStorage.setItem('token', res.token)
          localStorage.setItem('userName', this.userName)

          // 3. 跳转到主页面
          this.$router.push('/macro')
        } else {
          this.errorMsg = '用户名或密码错误'
        }
      } catch (e) {
        this.errorMsg = '请求失败'
      }
    },
  },
}
</script>

<style scoped>
.login-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  width: 400px;
  height: 550px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.login-header {
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}
.logo {
  width: 30%;
  height: auto;
}
.login-info {
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.login-item {
  width: 80%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  border-radius: 30px;
  padding: 8px 12px 8px 0px;
}

.login-item label {
  width: 70px;
  text-align: right;
  margin-right: 3px;
  color: #666;
}

.login-item input {
  flex: 1;
  padding: 8px;
  border: none;
  background: transparent;
  outline: none;
}
.login-btn {
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
}

.btn {
  width: 80%;
  height: 40px;
  background-color: #017fbc;
  border-radius: 20px;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.error-msg {
  color: red;
  height: 20%;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
}
</style>
