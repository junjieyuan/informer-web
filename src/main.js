import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import HomepageContent from "@/components/HomepageContent";
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import ChangePassword from "@/components/ChangePassword";
import ChangePrimaryPassword from "@/components/ChangePrimaryPassword";
import Library from "@/components/Library";
import GeneratePassword from "@/components/GeneratePassword";
import './registerServiceWorker'

const routes = [
    {path: '/', component: HomepageContent},
    {path: '/login', component: Login},
    {path: '/logout', component: Logout},
    {path: '/change-password', component: ChangePassword},
    {path: '/library', component: Library},
    {path: '/change-primary-password', component: ChangePrimaryPassword},
    {path: '/generate-password', component: GeneratePassword}
]
const router = new VueRouter({
        routes: routes
    }
)

Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app')
