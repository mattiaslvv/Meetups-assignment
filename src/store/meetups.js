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
  async sendReview({ commit, state }, id, reviewText) {
    let meetupId = id;
    let text = reviewText;
    //TODO: fix this! username undefined
    let username = state.newReview.username;
    let review = {
      username: username,
      text: text,
    };
    commit('review_request');
    console.log(meetupId, username, text);
    try {
      let res = await api.post('/meetups/review', meetupId, review);
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
