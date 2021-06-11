<template>
  <v-container>
    <v-form>
      <v-text-field v-model="oldPassword" label="当前密码" required type="password" autocomplete="current-password"></v-text-field>
      <v-text-field v-model="newPassword" label="新密码" required type="password" autocomplete="new-password"></v-text-field>
      <v-text-field v-model="confirmPassword" label="确认新密码" required type="password" autocomplete="new-password"></v-text-field>
      <v-btn label="Change Password" @click="changeMasterPassword">修改主密码</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "ChangePrimaryPassword",
  data: () => ({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }),
  methods: {
    changeMasterPassword: function () {
      const json_login_info = JSON.stringify(this.$data);
      const self = this

      axios.interceptors.response.use(
          response => {
            return response
          },
          error => {
            if (error.response.status === 403) {
              alert('未登录，将跳转到登录页面')
              self.$router.push('/login')
            }
          }
      )

      axios.put('/api/change-master-password', json_login_info).then(function (response) {
        if (response.status === 200) {
          alert('成功')
          self.$router.push('/library')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>