<template>
  <v-container>
    <v-form>
      <v-text-field v-model="username" label="Username" required></v-text-field>
      <v-text-field v-model="password" label="Password" required type="password" autocomplete="current-password"></v-text-field>
      <v-btn @click="login">登录</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: "Login",
  data: () => ({
    username: '',
    password: '',
    loginField: ['username', 'password']
  }),
  methods: {
    login: function () {
      const json_login_info = JSON.stringify(this.$data, this.loginField);
      const self = this

      axios.interceptors.response.use(
          response => {
            return response
          },
          error => {
            if (error.response.status === 401) {
              alert('用户名或密码错误，请重试')
            }
            return error
          }
      )

      axios.post('/api/login', json_login_info).then(function (response) {
        if (response.status === 200) {
          self.$router.push('/library')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>