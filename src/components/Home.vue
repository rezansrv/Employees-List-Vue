<template>
  <div class="container">
    <h1 class="header">Employees List</h1>
    <!-- اضافه کردن ورودی برای نام کارمند -->

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Salary</th>
          <th>Age</th>
          <th>Uni</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <td>{{ employee.id }}</td>
          <td>{{ employee.employee_name }}</td>
          <td>{{ employee.employee_salary }} $</td>
          <td>{{ employee.employee_age }}</td>
          <td>{{ employee.employee_uni.length ? employee.employee_uni : '----' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

export default {
  name: "employeesList",
  data() {
    return {
      employees: [],
      newEmployeeName: "",
      newEmployeeSalary: "",
      newEmployeeAge: "",
      newEmployeeUni: "",
    };
  },
  mounted() {
    this.loadEmployees();
  },
  methods: {
    loadEmployees() {
      axios
        .get("http://localhost:3000/employees")
        .then((response) => {
          this.employees = response.data;
        })
        .catch((error) => {
          console.error("خطا در دریافت داده‌ها: " + error);
        });
    },
  },
};
</script>
  
  <style scoped>
  
  .header {
    margin: 0 auto;
    display: block;
    width: 100%;
    text-align: center;
    color: #003670; /* رنگ متن هدر */
    margin-bottom: 35px;
    margin-top: 20px;
  }
  
  .container {
    margin: 0 auto;
  }
  
  .input-field {
    margin: 5px;
    padding: 7px; /* تغییر اندازه پدینگ */
    border: 1px solid #ccc;
    border-radius: 3px;
    background-color: #f8f8f8;
  }
  
  .input-container button {
    background-color: #007BFF;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;
  }
  
  .input-container button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .input-container button:hover {
    background-color: #0056b3;
  }
  
  
  .input-container {
    display: flex;
    justify-content: center;
    padding: 30px;
  }
  
  .add-button {
    background-color: #007BFF;
    color: white;
    padding: 7px 20px;
    border: none;
    margin-left: 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;
  }
  
  .add-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .add-button:hover {
    background-color: #0056b3;
  }
  
  .delete-btn{
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  .delete-btn:hover{
    scale: 1.1;
  }
  
  .employees-list {
    text-align: center;
  }
  
  table {
    width: 60%;
    border-collapse: collapse;
    text-align: center;
    margin-top: 20px;
    margin: 0 auto;
  
  }
  
  th,
  td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
    
    
  }
  
  th {
    background-color: #f0f0f0;
  }
  
  tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  </style>
  