<template>
  <div id="app">
    <!-- <employeesList/> -->
    <!-- Use router-link to navigate to the /signup route -->
    <links style=" display: flex;
  justify-content: flex-end;">
      <!-- <router-link to="/">Home</router-link> -->
      <router-link to="/signup" style="display: flex; width: 80px; justify-content: center;">Sign Up</router-link>
      <router-link to="/login"  style="display: flex; width: 80px; justify-content: center;"  >Login</router-link>
    </links>
    <!-- Display the content of the active route here -->
    <router-view></router-view>
  </div>
</template>

<script>
// import employeesList from './components/Admin.vue'

export default {
  name: "App",
  components: {
    // employeesList
  },
};
</script>

<style>
#app {
  font-family: "Roboto", sans-serif;
  margin-top: 20px;
}

/* Style for router-link components */
 a {
  margin: 5px;
  text-align: left;
  text-decoration: none;
  color: #007bff;
  font-weight: 600;
  padding: 5px 10px;
  border: 1px solid #007bff;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

 a:hover {
  background-color: #007bff;
  color: white;
}
</style>
