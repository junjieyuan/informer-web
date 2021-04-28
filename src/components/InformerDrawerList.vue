<template>
  <v-list>
    <v-subheader>Informer</v-subheader>
    <v-list-item-group>
      <v-list-item href="/">
        首页
      </v-list-item>
      <v-list-item href="/libraries.html">
        保存的密码
      </v-list-item>
      <v-list-item href="/login.html">
        登录
      </v-list-item>
      <v-list-item href="/logout.html">
        注销
      </v-list-item>
      <v-list-item href="/change-password.html">
        修改密码
      </v-list-item>
      <v-list-item href="/change-master-password.html">
        修改主密码
      </v-list-item>
      <v-list-item href="/generate-password.html">
        生成密码
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: "InformerDrawerList"
}
</script>

<style scoped>

</style>