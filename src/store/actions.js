//***********************/
//*** GLOBAL ACTIONS ***/
//*********************/
import router from '../router';

const actions = {
  async loginThisUser(context) {
    let user = {
      username: context.state.loginForm.username,
      password: context.state.loginForm.password,
    };
    await context.dispatch('login', user);
  },
  async registerThisUser(context) {
    let user = {
      username: context.state.registerForm.username,
      password: context.state.registerForm.password,
      confirm_password: context.state.registerForm.confirm_password,
      email: context.state.registerForm.email,
      name: context.state.registerForm.name,
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
    let newTime;
    if (context.state.meetupForm.time == '') {
      newTime = 'To Be Decided';
    } else {
      newTime = context.state.meetupForm.time;
    }
    let postData = {
      eventName: context.state.meetupForm.eventName,
      host: context.getters.user.name,
      details: context.state.meetupForm.details,
      address: context.state.meetupForm.address,
      date: context.state.meetupForm.date,
      time: newTime,
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
  async removeThisMeetup(context, id) {
    let postData = {
      id: id,
      userId: context.getters.user._id,
    };
    await context.dispatch('removeMeetup', postData);
  },
};

export default actions;
