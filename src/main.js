import Vue from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import VueRouter from 'vue-router';

import SignUpUser from "./components/SignUpUser.vue";
import LoginUser from "./components/LoginUser.vue"; // Updated component name
import Admin from "./components/Admin.vue"; // Updated component name
import Home from "./components/Home.vue"; 



Vue.use(VueRouter);

const routes = [
  { path: "/signup", component: SignUpUser },
  { path: "/login", component: LoginUser }, // Updated component name
  { path: "/Admin", component: Admin }, // Updated component name
  { path: "/", component: Home } // Redirect unknown routes to Login
];

const router = new VueRouter({
  routes,
  mode:'history'
});

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
