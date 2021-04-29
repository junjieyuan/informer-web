<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <InformerDrawerList current=""></InformerDrawerList>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>
        {{ title }}
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import InformerDrawerList from "@/components/InformerDrawerList";

export default {
  name: 'App',

  components: {
    InformerDrawerList
  },

  data: () => ({
    drawer: null,
    title: 'Informer'
  }),
};
</script>
