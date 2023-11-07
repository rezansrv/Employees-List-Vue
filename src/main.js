import Vue from "vue";
import App from "./App.vue";
import VueSweetalert2 from "vue-sweetalert2";
import VueRouter from "vue-router";
import SignUpUser from "./components/SignUpUser.vue";
import LoginUser from "./components/LoginUser.vue";
import Admin from "./components/Admin.vue";
import Home from "./components/Home.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/signup", component: SignUpUser }, // Route for user sign-up
  { path: "/", component: LoginUser }, // Default route for user login
  { path: "/Admin", component: Admin, meta: { requiresAdmin: true } }, // Admin dashboard route (requires admin privileges)
  { path: "/home", component: Home, meta: { requiresUser: true } }, // User dashboard route (requires user privileges)
];

const router = new VueRouter({
  routes,
  mode: "history", // Use history mode for cleaner URLs
});

router.beforeEach((to, from, next) => {
  const isUser = localStorage.getItem("isUser") === "true"; // Check if the user is logged in
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Check if the user has admin privileges

  // If the user is an admin, grant access to various pages
  if (isAdmin) {
    next();
  } else if (to.matched.some((record) => record.meta.requiresUser) && !isUser) {
    // If regular users are not granted access
    next("/"); // Redirect to another page
  } else if (
    to.matched.some((record) => record.meta.requiresAdmin) &&
    !isAdmin
  ) {
    // If admins are not granted access
    next("/"); // Redirect to another page
  } else {
    next(); // Allow access
  }
});

// If you don't need the styles, do not import them
import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
