<template>
  <div class="container">
    <h2 class="registration-title">Registration</h2>
    <form @submit.prevent="registerUser" class="registration-form">
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="user.firstName" required>
      </div>

      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="user.lastName" required>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="user.email" required>
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="user.password" required>
      </div>

      <button type="submit" class="register-button">Register</button>
    </form>
    <p>Already have an account? <router-link to="/">Log In</router-link></p>
  </div>
  </template>
  
  <script>
  import axios from "axios";
  import Swal from "sweetalert2";
  
  // تابع isOrganizationEmail به عنوان یک تابع جداگانه اضافه شده است
  function isOrganizationEmail(email) {
    const organizationDomains = ["g2.com", "g2.co", "g2.org", "go2tr.com", "go2tr.co", "go2tr.org"];
    const domain = email.split("@")[1];
    return organizationDomains.includes(domain);
  }
  
  export default {
    data() {
      return {
        user: {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        },
      };
    },
    methods: {
      registerUser() {
        const registrationData = {
          first_name: this.user.firstName,
          last_name: this.user.lastName,
          email: this.user.email,
          pass: this.user.password,
          isAdmin: isOrganizationEmail(this.user.email),
        };
  
        axios
          .post("http://localhost:3000/user", registrationData)
          .then((response) => {
            Swal.fire("Registration successful", response.data, "success");
            this.$router.push("/");
          })
          .catch((error) => {
            console.error("Registration error:", error);
            console.error("Error message:", error.message);
            console.error("Error response:", error.response);
          });
      },
    },
  };
  </script>
  
<style>

.container{
  height: 100vh;
}
.registration-title {
  text-align: center;
  margin-top: 60px;
}

.registration-form {
  max-width: 400px;
  margin: 0 auto;
  background-color: #f7f7f7;
  padding: 30px;
  padding-left: 12px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.register-button {
  background-color: #007BFF;
  color: white;
  padding: 12px 20px;
  border: none;
  margin-top: 25px;
  width: 421px;
  cursor: pointer;
  border-radius: 5px;
}

.login-button:hover {
  background-color: #3195ff;
}

.success-message {
  margin-top: 20px;
  color: #5cb85c;
  font-weight: 600;
}

p {
  text-align: center;
  margin-top: 20px;
}

p a {
  color: #007BFF;
  text-decoration: none;
  font-weight: 600;
  margin-left: 5px;
}

</style>