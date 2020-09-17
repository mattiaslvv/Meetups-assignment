import axios from 'axios';
import router from '../router/index.js';

//****************************/
//*** SET BASEURL FOR API ***/
//**************************/
// TODO: change for deployment of backend server to heroku
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

//*****************************/
//*** AUTHENTICATION STATE ***/
//***************************/

const state = {
  token: window.localStorage.getItem('token') || '',
  user: {
    createdMeetups: '',
    date: '',
    email: '',
    name: '',
    username: '',
  },
  status: '',
  error: null,
};

//*******************************/
//*** AUTHENTICATION GETTERS ***/
//*****************************/

const getters = {
  isLoggedIn: (state) => !!state.token,
  authState: (state) => state.status,
  user: (state) => state.user,
  error: (state) => state.error,
};

//*******************************/
//*** AUTHENTICATION ACTIONS ***/
//*****************************/

const actions = {
  //Login action
  async login({ commit }, user) {
    commit('auth_request');
    try {
      let res = await api.post('/users/login', user);
      if (res.data.success) {
        const token = res.data.token;
        const user = res.data.user;
        // Store the token in localStorage
        await commit('set_token', token);
        commit('auth_success', token, user);
        router.push('/Account');
      }
      return res;
    } catch (err) {
      commit('auth_error', err);
    }
  },
  // Register new user
  async register({ commit }, userData) {
    try {
      commit('register_request');
      let res = await api.post('/users/register', userData);
      console.log(res);
      if (res.data.success) {
        await commit('register_success');
        router.push('/Login');
      }
      return res;
    } catch (err) {
      commit('register_error', err);
    }
  },
  // Get the user profile
  async getProfile({ commit }) {
    commit('profile_request');
    api.defaults.headers.common['Authorization'] = state.token;
    let res = await api.get('/users/profile');
    commit('user_profile', res.data.user);
    return res;
  },
  // Logout the user
  async logout({ commit }) {
    window.localStorage.removeItem('token');
    commit('logout');
    delete axios.defaults.headers.common['Authorization'];
    router.push('/Login');
    return;
  },
};

//*********************************/
//*** AUTHENTICATION MUTATIONS ***/
//*******************************/

const mutations = {
  auth_request(state) {
    state.error = null;
    state.status = 'Loading..';
  },
  auth_success(state, token, user) {
    state.token = token;
    state.user = user;
    state.status = 'Success';
    state.error = null;
  },
  auth_error(state, err) {
    state.error = err.response.data.msg;
  },
  register_request(state) {
    state.error = null;
    state.status = 'Loading...';
  },
  register_success(state) {
    state.error = null;
    state.status = 'Success';
  },
  register_error(state, err) {
    state.error = err.response.data.msg;
  },
  logout(state) {
    state.error = null;
    state.status = '';
    state.token = '';
    state.user = '';
  },
  profile_request(state) {
    state.status = 'Loading...';
  },
  user_profile(state, user) {
    state.user = user;
  },
  set_token(state, token) {
    window.localStorage.setItem('token', token);
  },
  get_token(state) {
    return state.token;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
