import axios from 'axios';
//*******************************/
//*** API OPERATIONS MEETUPS ***/
//*****************************/

//TODO: fix api operations according to mongoDB & express.js data
const api = axios.create({
  baseURL: 'https://meetups-back-end.herokuapp.com/api',
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
  meetupsError: (state) => state.error,
  meetupsStatus: (state) => state.status,
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
  async sendReview({ commit }, payload) {
    let postData = {
      _id: payload._id,
      username: payload.username,
      text: payload.text,
    };
    commit('review_request');
    try {
      let res = await api.post('/meetups/review', postData);
      console.log(res);
      if (res.data.success) {
        await commit('review_success');
      }
      return res;
    } catch (err) {
      commit('review_error', err);
    }
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
  review_request(state) {
    state.error = null;
    state.status = 'Loading..';
  },
  review_success(state) {
    state.error = null;
    state.status = 'Success!';
  },
  review_error(state, err) {
    state.error = err.response.data.msg;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
