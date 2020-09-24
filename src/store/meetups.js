import axios from 'axios';
import router from '../router/index.js';
//*******************************/
//*** API OPERATIONS MEETUPS ***/
//*****************************/

//TODO: fix api operations according to mongoDB & express.js data
let url;
if (process.env.NODE_ENV === 'development') {
  url = 'http://localhost:5000/api/meetups';
} else {
  url = 'https://meetups-back-end.herokuapp.com/api';
}
const api = axios.create({
  baseURL: url,
});
//**********************/
//*** MEETUPS STATE ***/
//********************/

const state = {
  error: null,
  allMeetups: [],
  filteredMeetups: [],
  clickedMeetup: '',
};

//************************/
//*** MEETUPS GETTERS ***/
//**********************/

const getters = {
  getMeetups: (state) => state.allMeetups,
  meetupsError: (state) => state.error,
  clickedMeetup: (state) => state.clickedMeetup,
  filteredMeetups: (state) => state.filteredMeetups,
};

//************************/
//*** MEETUPS ACTIONS ***/
//**********************/

const actions = {
  // Get all meetups
  async getAllMeetups({ commit }) {
    commit('error_null');
    let res = await api.get('/all');
    commit('meetup_success', res.data.meetups);
    return res;
  },
  //Register a new meetup
  async registerMeetup({ commit }, postData) {
    commit('error_null');
    try {
      let res = await api.post('/register', postData);
      if (res.data.success) {
        router.push(`/MeetupDetails/${res.data.meetup._id}`);
      }
      return res;
    } catch (err) {
      commit('api_error', err);
    }
  },
  async sendReview({ commit }, postData) {
    commit('error_null');
    try {
      let res = await api.post('/review', postData);
      if (res.data.success) {
        router.history.go();
      }
      return res;
    } catch (err) {
      commit('api_error', err);
    }
  },
  async removeReview({ commit }, postData) {
    commit('error_null');
    try {
      let res = await api.put('/review', postData);
      if (res.data.success) {
        router.history.go();
      }
      return res;
    } catch (err) {
      commit('api_error', err);
    }
  },
  async getByThisKeyword({ commit }, keyword) {
    commit('get_by_keyword', keyword);
  },
  async displayAllMeetups({ commit }) {
    commit('display_all_meetups');
  },
  async getMeetupWithId({ commit }, payload) {
    const postData = {
      id: payload,
    };
    let res = await api.post('/meetup', postData);
    if (res.data.success) {
      await commit('set_clicked_meetup', res.data.meetups);
    }
    return res;
  },
  async clearClickedMeetup({ commit }) {
    await commit('set_clicked_meetup', null);
  },
  async attendMeetup({ commit }, postData) {
    commit('error_null');
    try {
      let res = await api.post('/attend', postData);
      if (res.data.success) {
        router.history.go();
      }
      return res;
    } catch (err) {
      commit('api_error', err);
    }
  },
  async removeAttendMeetup({ commit }, postData) {
    commit('error_null');
    try {
      let res = await api.put('/attend', postData);
      if (res.data.success) {
        router.history.go();
      }
      return res;
    } catch (err) {
      commit('api_error', err);
    }
  },
};

//**************************/
//*** MEETUPS MUTATIONS ***/
//************************/

const mutations = {
  error_null(state) {
    state.error = null;
  },
  meetup_success(state, meetups) {
    state.allMeetups = meetups;
    state.filteredMeetups = meetups;
    state.error = null;
  },
  api_error(state, err) {
    state.error = err.response.data.msg;
  },
  set_clicked_meetup(state, meetup) {
    state.clickedMeetup = meetup;
  },
  get_by_keyword(state, keyword) {
    let search = keyword.toLowerCase();
    if (!search.length) {
      state.filteredMeetups = state.allMeetups;
    } else {
      let foundMeetups = [];
      foundMeetups = state.allMeetups.filter((item) => {
        let lowercase = item.eventName.toLowerCase();
        return lowercase.match(search);
      });
      state.filteredMeetups = foundMeetups;
    }
  },
  display_all_meetups(state) {
    state.filteredMeetups = state.allMeetups;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
