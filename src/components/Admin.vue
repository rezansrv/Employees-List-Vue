<template>
  <div class="container" :style="backgroundStyle">
    <h1 class="header">Employees List</h1>
    <div class="employee-form">
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
      </div>
      <button
        @click="addEmployee"
        :disabled="isButtonDisabled"
        class="add-button"
      >
        <i class="fa fa-plus" style="font-size: 22px; color: #fff"></i>
      </button>
      <button @click="saveEmployeeChanges" class="add-button edit-button">
        <i class="fa fa-save" style="font-size: 22px;  color: #fff"></i> Save
        Changes
      </button>
    </div>

    <table>
      <thead>
        <tr>
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
          <td>{{ employee.id }}</td>
          <td>{{ employee.employee_name }}</td>
          <td>{{ employee.employee_salary }} $</td>
          <td>{{ employee.employee_age }}</td>
          <td>{{ employee.employee_uni || "----" }}</td>
          <td>
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
      editEmployeeId: null,
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
    backgroundStyle() {
      return {
        backgroundImage: `url(https://source.unsplash.com/1080x1080/?light-blue,${Math.random()} ) `,
      };
    },
  },
  mounted() {
    this.loadEmployees();
  },
  methods: {
    sanitizeInput() {
      this.newEmployeeSalary = this.newEmployeeSalary.replace(/[^0-9]/g, "");
      this.newEmployeeAge = this.newEmployeeAge.replace(/[^0-9]/g, "");
    },
    loadEmployees() {
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
      axios
        .post("http://localhost:3000/employees", {
          employee_name: this.newEmployeeName,
          employee_salary: this.newEmployeeSalary,
          employee_age: this.newEmployeeAge,
          employee_uni: this.newEmployeeUni,
        })
        .then((response) => {
          if (response.status === 201) {
            Swal.fire("Employee added successfully!", response.data, "success");

            this.newEmployeeName = "";
            this.newEmployeeSalary = "";
            this.newEmployeeAge = "";
            this.newEmployeeUni = "";
            this.loadEmployees();
          } else {
            Vue.swal("Error adding employee.");
          }
        });
    },
    deleteEmployee(employeeId) {
      axios
        .delete("http://localhost:3000/employees/" + employeeId)
        .then((response) => {
          if (response.status === 200) {
            Swal.fire(
              "Employee deleted successfully!",
              response.data,
              "success"
            );

            this.loadEmployees();
          } else {
            Vue.swal("Error deleting employee.");
          }
        });
    },
    editEmployee(employee) {
      this.newEmployeeName = employee.employee_name;
      this.newEmployeeSalary = employee.employee_salary;
      this.newEmployeeAge = employee.employee_age;
      this.newEmployeeUni = employee.employee_uni || "";
      this.editEmployeeId = employee.id;
    },
    saveEmployeeChanges() {
      if (this.editEmployeeId) {
        axios
          .put("http://localhost:3000/employees/" + this.editEmployeeId, {
            employee_name: this.newEmployeeName,
            employee_salary: this.newEmployeeSalary,
            employee_age: this.newEmployeeAge,
            employee_uni: this.newEmployeeUni,
          })
          .then((response) => {
            if (response.status === 200) {
              Swal.fire(
                "Employee updated successfully!",
                response.data,
                "success"
              );
              this.newEmployeeName = "";
              this.newEmployeeSalary = "";
              this.newEmployeeAge = "";
              this.newEmployeeUni = "";
              this.editEmployeeId = null;
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
  color: #003670;
  margin-bottom: 30px;
}
.container {
  max-width: 80%;
  padding: 40px;
  margin: 0 auto;
  margin-top: 30px;
  text-align: center;
  height: 150vh;
  border-radius: 20px;
  background-size: cover;
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
  background-color: #207cca;
  cursor: not-allowed;
}

.add-button:hover {
  background-color: #0056b3;
}

.edit-button{
margin-top: 2px;
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
