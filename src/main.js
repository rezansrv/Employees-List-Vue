import Vue from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import VueRouter from 'vue-router';
import SignUpUser from "./components/SignUpUser.vue";
import LoginUser from "./components/LoginUser.vue";
import Admin from "./components/Admin.vue";
import Home from "./components/Home.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/signup", component: SignUpUser },
  { path: "/", component: LoginUser },
  { path: "/Admin", component: Admin, meta: { requiresAdmin: true } },
  { path: "/home", component: Home , meta: {requiresUser: true }}
];

const router = new VueRouter({
  routes,
  mode: 'history'
});



router.beforeEach((to, from, next) => {
  const isUser = localStorage.getItem('isUser') === 'true';
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // اگر کاربر ادمین باشد، دسترسی به صفحات مختلف برای او فعال می‌شود
  if (isAdmin) {
    next();
  } else if (to.matched.some(record => record.meta.requiresUser) && !isUser) {
    // اگر به کاربران عادی دسترسی داده نمی‌شود
    next('/'); // به صفحه دیگری هدایت کنید
  } else if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) {
    // اگر به ادمین‌ها دسترسی داده نمی‌شود
    next('/'); // به صفحه دیگری هدایت کنید
  } else {
    next();
  }
})


// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
