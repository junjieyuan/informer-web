<template>
  <v-container>
    <v-text-field v-model="generatedPassword" label="密码" type="text"></v-text-field>
    <v-btn label="Generate Password" @click="generatePassword">重新生成密码</v-btn>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "GeneratePassword",
  data: () => ({
    generatedPassword: ""
  }),
  methods: {
    generatePassword: function () {
      const self = this
      axios.get('/api/generate-password').then(function (response) {
        if (response.status == 200) {
          self.generatedPassword = response.data['password']
        }
      })
    }
  }
}
</script>

<style scoped>

</style>