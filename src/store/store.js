import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    employees: [],
  },
  mutations: {
    setEmployees(state, employees) {
      state.employees = employees;
    },

  },
  actions: {
    fetchEmployees({ commit }) {
      // Fetch employee data from the server
      axios
        .get("http://localhost:3000/employees")
        .then((response) => {
          commit("setEmployees", response.data); // Commit a mutation to update the state
        })
        .catch((error) => {
          console.error("Error fetching data: " + error);
        });
    },
    removeEmployees({ commit, state }, id) {
      const updatedEmployees = state.employees.filter(employee => employee.id !== id);
      commit("setEmployees", updatedEmployees);
    },
    editEmployees({ commit, state }, updatedEmployee) {
      const updatedEmployees = state.employees.map((employee) => {
        if (employee.id === updatedEmployee.id) {
          return updatedEmployee;
        }
        return employee;
      });
      commit("setEmployees", updatedEmployees);
    }
  },
  getters: {
    getEmployees(state) {
      return state.employees;
    },
  },
});
