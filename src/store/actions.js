//***********************/
//*** GLOBAL ACTIONS ***/
//*********************/
import router from '../router';

const actions = {
  async loginThisUser(context, value) {
    let user = {
      username: value.username,
      password: value.password,
    };
    await context.dispatch('login', user);
  },
  async registerThisUser(context, value) {
    let user = {
      username: value.username,
      password: value.password,
      confirm_password: value.confirm_password,
      email: value.email,
      name: value.name,
    };
    await context.dispatch('register', user);
  },
  async sendThisReview(context, payload) {
    const text = payload.text;
    const id = payload._id;
    const username = context.getters.user.username;
    const postData = {
      _id: id,
      text: text,
      username: username,
    };
    await context.dispatch('sendReview', postData);
  },
  async removeThisReview(context, id) {
    const username = context.getters.user.username;
    const postData = {
      _id: id,
      username: username,
    };
    await context.dispatch('removeReview', postData);
  },
  async viewFullMeetup(context, id) {
    router.push(`/MeetupDetails/${id}`);
  },
  async registerThisMeetup(context) {
    await context.dispatch('geocodeLocation', context.state.meetupForm.address);
    let postData = {
      eventName: context.state.meetupForm.eventName,
      host: context.getters.user.name,
      details: context.state.meetupForm.details,
      address: context.state.meetupForm.address,
      date: context.state.meetupForm.date,
      time: context.state.meetupForm.time,
      location: context.getters.getLocation,
    };
    await context.dispatch('registerMeetup', postData);
  },
  async getThisMeetupWithId(context, id) {
    await context.dispatch('getMeetupWithId', id);
  },
  async attendThisMeetup(context, id) {
    const postData = {
      name: context.getters.user.name,
      id: id,
    };
    await context.dispatch('attendMeetup', postData);
  },
  async removeAttendThisMeetup(context, id) {
    const postData = {
      name: context.getters.user.name,
      id: id,
    };
    await context.dispatch('removeAttendMeetup', postData);
  },
};

export default actions;
