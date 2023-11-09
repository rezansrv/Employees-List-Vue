<template>
  <div id="app">

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
  computed(){
    // Read the value of `isAdmin` from Local Storage and set it
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    this.isAdmin = isAdmin;
    const isUser = localStorage.getItem("isUser") === "true";
    this.isUser = isUser;
  },
  created() {

  },
  methods:{
    logingOut(){
      console.log("asbvkskjvshkisdj")
      localStorage.clear(); 
      //       Swal.fire({
      //   text: "You must Login First",
      //   icon: "warning",
      //   confirmButtonColor: "#3085d6",
      //   cancelButtonColor: "#d33",
      //   confirmButtonText: "OK",
      // })
  },

  
  }
};
</script>

<style>
#app {
  font-family: "Roboto", sans-serif;
  padding-top: 20px;
  background-color: #ffffff;
  opacity: 1;
  background-image: repeating-radial-gradient(
      circle at 0 0,
      transparent 0,
      #efeeee 14px
    ),
    repeating-linear-gradient(#f3f2f255, #f3f2f2);
}

/* Style for router-link components */
a {
  margin: 5px;
  text-align: center;
  text-decoration: none;
  color: #ffffff;
  font-weight: 600;
  padding: 5px 10px;
  border: 1px solid #007bff;
  background-color: #007bff;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
  flex-wrap: wrap;
}

a:hover {
  background-color: #ffffff;
  color: #007bff;
}
</style>
