<template>
  <div class="container">
    <div class="links" style="display: flex; justify-content: center; margin-bottom: 30px;" >
      <router-link
      to="/tasks"
      style="display: flex; width: 80px; justify-content: center"
      >Tasks</router-link
    >
    <router-link
      to="/home"
      style="display: flex; width: 80px; justify-content: center"
      >Home</router-link
    >
    <router-link
      to="/"
      class="logout-btn"
      style="
        display: flex;
        width: 80px;
        justify-content: center;
        border: none;
        text-align: right;
      "
    >
      <span v-on:click="logingOut">logout</span>
    </router-link>
</div>

    <h1 class="header">Employees List</h1>
    <div class="employee-form">
      <!-- Form for adding or editing employees -->
      <div class="input-row">
        <input
          v-model="newEmployeeName"
          placeholder="Name"
          class="input-field"
        />
        <input
          v-model="newEmployeeSalary"
          placeholder="Salary"
          class="input-field"
          @input="sanitizeInput"
        />
        <input
          v-model="newEmployeeAge"
          placeholder="Age"
          class="input-field"
          @input="sanitizeInput"
        />
        <input
          v-model="newEmployeeUni"
          v-if="newEmployeeAge >= 20"
          placeholder="Uni"
          class="input-field"
        />
        <input
          v-model="newEmployeeTask"
          placeholder="Add Task (optional)"
          class="input-field"
        />
      </div>
      <button
      v-if="!onClickEdit"
        @click="addEmployee"
        :disabled="isButtonDisabled"
        class="add-button"
      >
        <!-- Add employee button -->
        <i class="fa fa-plus" style="font-size: 22px; color: #fff"></i>
      </button>
      <button v-if="onClickEdit" @click="saveEmployeeChanges" class="add-button edit-button">
        <!-- Save employee changes button -->
        <i class="fa fa-save" style="font-size: 22px; color: #fff"></i> Save
        Changes
      </button>
    </div>

    <table>
      <thead>
        <tr>
          <!-- Table header columns -->
          <th>ID</th>
          <th>Name</th>
          <th>Salary</th>
          <th>Age</th>
          <th>Uni</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <!-- Displaying employee data -->
          <td>{{ employee.id }}</td>
          <td>{{ employee.employee_name }}</td>
          <td>{{ employee.employee_salary }} $</td>
          <td>{{ employee.employee_age }}</td>
          <td>{{ employee.employee_uni || "----" }}</td>
          <td>
            <!-- Buttons for deleting and editing employees -->
            <a @click="deleteEmployee(employee.id)" class="btn btn-danger">
              <i class="fa fa-trash"></i> Delete
            </a>
            <a @click="editEmployee(employee)" class="btn btn-primary">
              <i class="fa fa-pencil"></i> Edit
            </a>
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
import Swal from "sweetalert2";

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
      newEmployeeTask:"",
      editEmployeeId: null,
      onClickEdit: false,      
    };
  },
  computed: {
    isButtonDisabled() {
      return !(
        this.newEmployeeName &&
        this.newEmployeeSalary &&
        this.newEmployeeAge
      );
    },
  },
  mounted() {
    // Load employees when the page is mounted
    this.loadEmployees();
  },
  methods: {
    logingOut() {
      localStorage.clear();
            Swal.fire({
              title:"logged Out",
        text: "You have successfully logged Out. ",
        icon: "success",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      })
    },
    sanitizeInput() {
      // Remove non-numeric characters from salary and age inputs
      this.newEmployeeSalary = this.newEmployeeSalary.replace(/[^0-9]/g, "");
      this.newEmployeeAge = this.newEmployeeAge.replace(/[^0-9]/g, "");
    },
    loadEmployees() {
      // Fetch employee data from the server
      axios
        .get("http://localhost:3000/employees")
        .then((response) => {
          this.employees = response.data;
        })
        .catch((error) => {
          console.error("Error fetching data: " + error);
        });
    },
    addEmployee() {
      // Add a new employee to the server
      axios
        .post("http://localhost:3000/employees", {
          employee_name: this.newEmployeeName,
          employee_salary: this.newEmployeeSalary,
          employee_age: this.newEmployeeAge,
          employee_uni: this.newEmployeeUni,
          employee_task:this.newEmployeeTask,
        })
        .then((response) => {
          if (response.status === 201) {
            Swal.fire("Employee added successfully!", response.data, "success");

            // Clear input fields after adding
            this.newEmployeeName = "";
            this.newEmployeeSalary = "";
            this.newEmployeeAge = "";
            this.newEmployeeUni = "";
            this.newEmployeeTask="";

            // Reload the list of employees
            this.loadEmployees();
          } else {
            Vue.swal("Error adding employee.");
          }
        });
    },
    deleteEmployee(employeeId) {
      // Delete an employee from the server
      axios
        .delete("http://localhost:3000/employees/" + employeeId)
        .then((response) => {
          if (response.status === 200) {
            Swal.fire(
              "Employee deleted successfully!",
              response.data,
              "success"
            );

            // Reload the list of employees
            this.loadEmployees();
          } else {
            Vue.swal("Error deleting employee.");
          }
        });
    },
    editEmployee(employee) {
      if (this.onClickEdit) {
    // اگر مقدار onClickEdit در حال حاضر true باشد، آن را به false تغییر دهید.
    this.onClickEdit = false;
  } else {
    // در غیر این صورت، مقدار را به true تنظیم کنید.
    this.onClickEdit = true;
  }
      console.log(this.onClickEdit);

      // Edit an existing employee
      this.newEmployeeName = employee.employee_name;
      this.newEmployeeSalary = employee.employee_salary;
      this.newEmployeeAge = employee.employee_age;
      this.newEmployeeUni = employee.employee_uni || "";
      this.newEmployeeTask= employee.employee_task;
      this.editEmployeeId = employee.id;
    },
    saveEmployeeChanges() {
      if (this.editEmployeeId) {
        // Save changes made to an employee
        axios
          .put("http://localhost:3000/employees/" + this.editEmployeeId, {
            employee_name: this.newEmployeeName,
            employee_salary: this.newEmployeeSalary,
            employee_age: this.newEmployeeAge,
            employee_uni: this.newEmployeeUni,
            employee_task:this.newEmployeeTask
            
          })
          .then((response) => {
            if (response.status === 200) {
              Swal.fire(
                "Employee updated successfully!",
                response.data,
                "success"
              );

              // Clear input fields after updating
              this.newEmployeeName = "";
              this.newEmployeeSalary = "";
              this.newEmployeeAge = "";
              this.newEmployeeUni = "";
              this.newEmployeeTask="";
              this.editEmployeeId = null;

              // Reload the list of employees
              this.loadEmployees();
            } else {
              Swal.fire("Error updating employee.");
            }
          });
      }
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
  margin-bottom: 30px;
}
.container {
  max-width: 80%;
  padding: 40px;
  margin: 0 auto;
  margin-top: 30px;
  text-align: center;
  height: 200vh;
  border-radius: 20px;
  background-size: cover;
  background-image: url("@/assets/img/bg8.jpg");
}

.employee-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 15px;
  width: 90%;
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
  margin-bottom: 15px;
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
  background-color: #207cca;
  cursor: not-allowed;
}

.add-button:hover {
  background-color: #0056b3;
}

.edit-button {
  margin-top: 25px;
  margin-bottom: 15px;
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
  margin-top: 50px;
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

.logout-btn{
  background-color: red;
  color: white;

}
.logout-btn:hover{
  color: red;
  background: white;
}
@media only screen and (max-width: 600px) {
  .container {
    height: 250vh;
    width: 100%;
  }
}
</style>
