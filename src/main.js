import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import HomepageContent from "@/components/HomepageContent";
import Login from '@/components/Login'
import Logout from '@/components/Logout'

const routes = [
    {path: '/', component: HomepageContent},
    {path: '/login', component: Login},
    {path: '/logout', component: Logout},
]
const router = new VueRouter({
        routes
    }
)

Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
  vuetify,
    router,
  render: h => h(App)
}).$mount('#app')
