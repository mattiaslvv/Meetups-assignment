import axios from 'axios';

//*******************************/
//*** API OPERATIONS MEETUPS ***/
//*****************************/

//TODO: fix api operations according to mongoDB & express.js data
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

//**********************/
//*** MEETUPS STATE ***/
//********************/

const state = {
  status: '',
  error: null,
  allMeetups: [],
};

//************************/
//*** MEETUPS GETTERS ***/
//**********************/

const getters = {
  getMeetups: (state) => state.allMeetups,
};

//************************/
//*** MEETUPS ACTIONS ***/
//**********************/

const actions = {
  // Get all meetups
  async getAllMeetups({ commit }) {
    commit('meetup_request');
    let res = await api.get('/meetups/all');
    commit('meetup_success', res.data.meetups);
    return res;
  },
};

//**************************/
//*** MEETUPS MUTATIONS ***/
//************************/

const mutations = {
  meetup_request(state) {
    state.error = null;
    state.status = 'Loading..';
  },
  meetup_success(state, meetups) {
    state.allMeetups = meetups;
    state.error = null;
    state.status = 'Success!';
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
