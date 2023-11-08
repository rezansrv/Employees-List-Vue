<template>
  <div class="container">
    <h1 class="header">Employees List</h1>
    <table>
      <thead>
        <tr>
          <!-- Table header columns -->
          <th>ID</th>
          <th>Name</th>
          <th>Salary</th>
          <th>Age</th>
          <th>Uni</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <!-- Displaying employee data fetched from the server -->
          <td>{{ employee.id }}</td>
          <td>{{ employee.employee_name }}</td>
          <td>{{ employee.employee_salary }} $</td>
          <td>{{ employee.employee_age }}</td>
          <td>
            <!-- Displaying university information if available, otherwise displaying a dash -->
            {{ employee.employee_uni.length ? employee.employee_uni : "----" }}
          </td>
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
    // When the page is loaded, employee data is loaded from the server
    this.loadEmployees();
  },
  computed: {},
  methods: {
    // Function to load employee data from the server
    loadEmployees() {
      axios
        .get("http://localhost:3000/employees")
        .then((response) => {
          this.employees = response.data;
        })
        .catch((error) => {
          // In case of an error, the error is displayed
          console.error("Error in getting data" + error);
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
  color: #ffffff;
  margin-bottom: 40px;
}
.container {
  max-width: 80%;
  padding: 40px;
  margin: 0 auto;
  margin-top: 50px;
  text-align: center;
  height: 100vh;
  border-radius: 10px;
  background-size: cover;
  background-image: url("@/assets/img/bg5.jpg");
}

.employee-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 15px;
  width: 75%;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #ffffffcc;
}

.input-field {
  width: 100%;
  margin: 5px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.input-row {
  display: flex;
  gap: 10px;
}

.add-button {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 25px;
  background-color: #207cca;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.add-button:disabled {
  background-color: #ccc;
}

.add-button:hover {
  background-color: #0056b3;
}

.delete-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.delete-btn:hover {
  transform: scale(1.1);
}

table {
  width: 100%;
  margin-bottom: 50px;
  border-collapse: collapse;
  text-align: center;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
}

th,
td {
  border: 1px solid #ccccccc1;
  padding: 10px;
  text-align: center;
}

th {
  background-color: #f0f0f0b0;
  padding: 12px;
  font-size: 14px;
}

tbody tr:nth-child(even) {
  background-color: #f2f2f2d8;
  transition: background-color 0.3s;
}

tbody tr:nth-child(odd) {
  background-color: #f8f8f8d7;
  transition: background-color 0.3s;
}

tbody tr:hover {
  background-color: #cfe8fc;
}
</style>
