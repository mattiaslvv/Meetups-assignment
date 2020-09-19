//****************************************/
//*** IMPORT STORE MODULES & VUE/VUEX ***/
//**************************************/
import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions.js';
import getters from './getters.js';
import mutations from './mutations.js';
import Auth from './auth.js';
import Meetups from './meetups.js';

Vue.use(Vuex);
//*********************/
//*** GLOBAL STATE ***/
//*******************/
export default new Vuex.Store({
  state: {
    loginForm: {
      username: '',
      password: '',
    },
    registerForm: {
      name: '',
      username: '',
      confirm_password: '',
      email: '',
      password: '',
    },
    newReview: [
      {
        username: '',
      },
    ],
  },
  mutations: mutations,
  actions: actions,
  getters: getters,
  modules: {
    Auth,
    Meetups,
  },
});
