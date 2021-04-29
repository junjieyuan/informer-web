<template>
  <v-container>
    <v-form>
      <v-btn @click="logout">注销</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Logout",
  methods: {
    logout: function () {
      axios.post('/api/logout').then(function (response) {
        if (response.status === 200) {
          window.location.href = "/index.html"
        }
      })
    }
  }
}
</script>

<style scoped>

</style>