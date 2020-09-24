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
import MapAPI from './mapAPI.js';

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
    meetupForm: {
      eventName: '',
      host: '',
      details: '',
      time: '',
      date: '',
      address: '',
      location: {},
    },
  },
  mutations: mutations,
  actions: actions,
  getters: getters,
  modules: {
    Auth,
    Meetups,
    MapAPI,
  },
});
