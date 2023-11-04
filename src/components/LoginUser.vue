<template>
    <div>
      <h2 class="login-title">Login</h2>
      <form @submit.prevent="loginUser" class="login-form">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="user.email" required />
        </div>
  
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="user.password" required />
        </div>
  
        <button type="submit" class="login-button">Login</button>
      </form>
      <p>Don't have an account? <router-link to="/signup">Register</router-link></p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Swal from "sweetalert2";
  
  export default {
    data() {
      return {
        user: {
          email: "",
          password: "",
        },
        loginSuccess: null, // Updated to use null for initial state
      };
    },
    methods: {
      loginUser() {
        const loginData = {
          email: this.user.email,
          pass: this.user.password,
        };
  
        // Perform a GET request to check if the user exists
        axios
          .get("http://localhost:3000/user", { params: loginData })
          .then((response) => {
            if (response.data.length > 0) {
              // User with the provided email and password found
              this.loginSuccess = true;
              this.showLoginResult("Login successful", "You have successfully logged in.");
  
              // Check if the email is organizational
              const isOrganizationalEmail = this.isOrganizationalEmail(this.user.email);
  
              // Redirect based on email type
              if (isOrganizationalEmail) {
                // Redirect to the admin page
                this.$router.push("/admin");
              } else {
                // Redirect to the home page
                this.$router.push("/");
              }
            } else {
              // User not found
              this.loginSuccess = false;
              this.showLoginResult("Login failed", "User not found.");
            }
          })
          .catch((error) => {
            this.loginSuccess = false;
            this.showLoginResult("Login failed", "Error while checking user.");
            console.error("Login error:", error);
            console.error("Error message:", error.message);
            console.error("Error response:", error.response);
          });
      },
      showLoginResult(title, message) {
        Swal.fire(title, message, this.loginSuccess ? "success" : "error");
      },
      isOrganizationalEmail(email) {
        const organizationDomains = ["go2tr.com"]; // Add your organization's domains here
        const domain = email.split("@")[1];
        return organizationDomains.includes(domain);
      },
    },
  };
  </script>
    <style>
    .login-title {
      text-align: center;
      margin-top: 60px;
    }
    .login-form {
      max-width: 400px;
      margin: 0 auto;
      background-color: #f7f7f7;
      padding: 20px;
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
    
    .login-button {
      background-color: #007bff;
      color: white;
      padding: 12px 20px;
      border: none;
      width: 100%;
      cursor: pointer;
      border-radius: 5px;
    }
    
    p {
      text-align: center;
      margin-top: 20px;
    }
    
    p a {
      color: #007bff;
      text-decoration: none;
      font-weight: 600;
      margin-left: 5px;
    }
    </style>
    