//****************************************/
//*** IMPORT STORE MODULES & VUE/VUEX ***/
//**************************************/
import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions.js';
import getters from './getters.js';
import mutations from './mutations.js';

Vue.use(Vuex);
//*********************/
//*** GLOBAL STATE ***/
//*******************/
export default new Vuex.Store({
  state: {},
  mutations: mutations,
  actions: actions,
  getters: getters,
  modules: {},
});
