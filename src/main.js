import Vue from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import VueRouter from 'vue-router';
import { adminGuard } from './adminGuard';

import SignUpUser from "./components/SignUpUser.vue";
import LoginUser from "./components/LoginUser.vue";
import Admin from "./components/Admin.vue";
import Home from "./components/Home.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/signup", component: SignUpUser },
  { path: "/", component: LoginUser },
  { path: "/Admin", component: Admin, meta: { requiresAdmin: true } },
  { path: "/home", component: Home }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach(adminGuard);

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
