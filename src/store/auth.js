import axios from 'axios';
import router from '../router/index.js';
//*************************************/
//*** API OPERATIONS AUTHENTICATION***/
//***********************************/

//****************************/
//*** SET BASEURL FOR API ***/
//**************************/
let url;
if (process.env.NODE_ENV === 'development') {
  url = 'http://localhost:5000/api/users';
} else {
  url = 'https://meetups-back-end.herokuapp.com/api/users';
}
const api = axios.create({
  baseURL: url,
});
//*****************************/
//*** AUTHENTICATION STATE ***/
//***************************/

const state = {
  token: window.localStorage.getItem('token') || '',
  user: {},
  error: null,
};

//*******************************/
//*** AUTHENTICATION GETTERS ***/
//*****************************/

const getters = {
  isLoggedIn: (state) => !!state.token,
  user: (state) => state.user,
  error: (state) => state.error,
};

//*******************************/
//*** AUTHENTICATION ACTIONS ***/
//*****************************/

const actions = {
  //Login action
  async loginThisUser(context) {
    let user = {
      username: context.state.loginForm.username,
      password: context.state.loginForm.password,
    };
    context.commit('error_null');
    try {
      let res = await api.post('/login', user);
      if (res.data.success) {
        const token = res.data.token;
        const user = res.data.user;
        // Store the token in localStorage
        await context.commit('set_token', token);
        context.commit('auth_success', token, user);
        router.push('/Account');
      }
      return res;
    } catch (err) {
      context.commit('register_error', err);
    }
  },
  // Register new user
  async registerThisUser(context) {
    let user = {
      username: context.state.registerForm.username,
      password: context.state.registerForm.password,
      confirm_password: context.state.registerForm.confirm_password,
      email: context.state.registerForm.email,
      name: context.state.registerForm.name,
    };
    try {
      context.commit('error_null');
      let res = await api.post('/register', user);
      return res;
    } catch (err) {
      context.commit('register_error', err);
    }
  },
  // Get the user profile
  async getProfile({ commit }) {
    commit('error_null');
    api.defaults.headers.common['Authorization'] = state.token;
    let res = await api.get('/profile');
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
  error_null(state) {
    state.error = null;
  },
  auth_success(state, token, user) {
    state.token = token;
    state.user = user;
    state.error = null;
  },
  register_error(state, err) {
    state.error = err.response.data.msg;
  },
  logout(state) {
    state.error = null;
    state.token = '';
    state.user = '';
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
