import { getField } from 'vuex-map-fields';
//***********************/
//*** GLOBAL GETTERS ***/
//*********************/
const getters = {
  getField,
  isAttending: (state, rootGetters) => {
    let name = rootGetters.user.name;
    let checkAttendance = rootGetters.clickedMeetup.attendees.filter(
      (item) => item === name
    );
    if (checkAttendance.length == 1) {
      return true;
    } else {
      return false;
    }
  },
  alreadyReviewed: (state, rootGetters) => {
    let name = rootGetters.user.username;
    let checkReview = rootGetters.clickedMeetup.reviews.filter(
      (item) => item.username === name
    );
    if (checkReview.length == 1) {
      return true;
    } else {
      return false;
    }
  },
  getLocation: (state) => state.meetupForm.location,
};

export default getters;
