<template>
  <div class="container">
    <h1 class="header">Employees Tasks</h1>

    <div class="edit-form" v-if="editEmployeeForm.showForm">
      <form @submit="saveEmployeeChanges">
        <input
          v-model="editEmployeeForm.employeeId"
          type="hidden"
          name="employeeId"
        />
        <input
          v-model="editEmployeeForm.employeeName"
          type="text"
          placeholder="Name"
          class="input-field"
        />
        <input
          v-model="editEmployeeForm.employeeTask"
          type="text"
          placeholder="Task"
          class="input-field"
        />
        <button type="submit" class="btn btn-success">Save Changes</button>
        <button @click="cancelEdit" type="button" class="btn btn-danger mx-2">
          Cancel
        </button>
      </form>
    </div>

    <div class="row">
      <div v-for="employee in employees" :key="employee.id" class="col-md-6">
        <div class="card">
          <div class="card-body">
            <div class="employee-info">
              <div class="h5">{{ employee.employee_name }}</div>
              <div
                :class="{ lineStyle: drawLines[employee.id] }"
                class="employee-task"
              >
                {{ employee.employee_task }}
              </div>
            </div>
            <div class="buttons">
              <UpdateTask :employee="employee" />
              <DeleteTask :id="employee.id" />
              <button
                @click="editEmployee(employee)"
                class="btn btn-icon btn-primary mx-2"
                title="Edit"
              >
                <i class="fa fa-pencil"></i>
              </button>
              <button
                @click="deleteEmployee(employee.id)"
                class="btn btn-icon btn-danger mx-2"
                title="Delete"
              >
                <i class="fa fa-trash"></i>
              </button>
              <button
                @click="toggleLine(employee.id)"
                class="btn btn-icon btn-success mx-2"
                title="Mark as Done"
              >
                <i class="fa fa-check"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      drawLines: {},
      editEmployeeForm: {
        employeeId: null,
        showForm: false,
        employeeName: "",
        employeeTask: "",
      },
    };
  },
  computed: {
    employees() {
      return this.$store.getters.getEmployees;
    },
  },
  mounted() {
    this.$store.dispatch("fetchEmployees");
  },
  methods: {
    deleteEmployee(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You are about to delete this employee!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("removeEmployees", id).then(() => {
            Swal.fire("Employee deleted successfully!", "", "success");
          });
        }
      });
    },
    editEmployee(employee) {
      this.editEmployeeForm.employeeId = employee.id;
      this.editEmployeeForm.employeeName = employee.employee_name;
      this.editEmployeeForm.employeeTask = employee.employee_task;
      this.editEmployeeForm.showForm = true;
    },
    saveEmployeeChanges() {
      const updatedEmployee = {
        id: this.editEmployeeForm.employeeId,
        employee_name: this.editEmployeeForm.employeeName,
        employee_task: this.editEmployeeForm.employeeTask,
      };

      this.$store.dispatch("editEmployees", updatedEmployee);
      this.editEmployeeForm.showForm = false;
    },

    cancelEdit() {
      this.editEmployeeForm.showForm = false;
    },
    toggleLine(employeeId) {
      if (!(employeeId in this.drawLines)) {
        this.$set(this.drawLines, employeeId, false);
      }
      this.$set(this.drawLines, employeeId, !this.drawLines[employeeId]);
    },
  },
};
</script>

<style scoped>
.container {
  background-image: url("@/assets/img/bg5.jpg");
  max-width: 80%;
  padding: 3rem;
  margin: 0 auto;
  margin-top: 2rem;
  text-align: center;
  background-size: cover;
  height: 130vh;
  border-radius: 12px;
}
.header {
  margin: 0 auto;
  display: block;
  width: 100%;
  text-align: center;
  color: #ffffff;
  margin-bottom: 30px;
}
.employee-task {
  max-height: 100px;
  overflow: auto;
  white-space: normal;
  word-break: break-word;
}
.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.5rem;
}
.col-md-6 {
  flex: 0 0 calc(50% - 1rem);
  padding: 0 0.5rem;
}
.card {
  margin: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}
.employee-info {
  text-align: center;
}
.buttons {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}
.h5 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}
.lineStyle {
  text-decoration: line-through;
}
.edit-form {
  background: #f8f8f8;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
