<template>
  <v-list>
    <v-subheader>Informer</v-subheader>
    <v-list-item-group>
      <router-link to="/">
        <v-list-item>
          首页
        </v-list-item>
      </router-link>
      <router-link to="/library">
        <v-list-item>
          保存的密码
        </v-list-item>
      </router-link>
      <router-link to="/login">
        <v-list-item>
          登录
        </v-list-item>
      </router-link>
      <router-link to="/logout">
        <v-list-item>
          注销
        </v-list-item>
      </router-link>
      <router-link to="/change-password">
        <v-list-item>
          修改密码
        </v-list-item>
      </router-link>
      <router-link to="/change-primary-password">
        <v-list-item>
          修改主密码
        </v-list-item>
      </router-link>
      <router-link to="/generate-password">
        <v-list-item>
          生成密码
        </v-list-item>
      </router-link>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: "InformerDrawerList",
  props: {
    current: {
      type: String
    }
  }
}
</script>

<style scoped>

</style>