<template>
  <div id="app">
    <links style="display: flex; justify-content: center;">
      <router-link to="/signup" style="display: flex; width: 80px; justify-content: center;">Sign Up</router-link>
      <router-link to="/" style="display: flex; width: 80px; justify-content: center;">Login</router-link>
      <!-- Display the "Home" button only if the user is an admin -->
      <router-link v-if="isAdmin" to="/Admin" style="display: flex; width: 80px; justify-content: center;">Admin</router-link>
      <router-link to="/home" style="display: flex; width: 80px; justify-content: center;">Home</router-link>

    </links>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isAdmin: false, // Initially set as a regular user
    };
  },
  created() {
    // Read the value of `isAdmin` from Local Storage and set it
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    this.isAdmin = isAdmin;
  },
};
</script>

<style>
#app {
  font-family: "Roboto", sans-serif;
  padding-top: 20px;
  background-color: #ffffff;
opacity: 1;
background-image:  repeating-radial-gradient( circle at 0 0, transparent 0, #ffffff 14px ), repeating-linear-gradient( #f3f2f255, #f3f2f2 );
}


/* Style for router-link components */
a {
  margin: 5px;
  text-align: center;
  text-decoration: none;
  color: #007bff;
  font-weight: 600;
  padding: 5px 10px;
  border: 1px solid #007bff;
  background-color: #ffffff;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

a:hover {
  background-color: #007bff;
  color: white;
}
</style>
