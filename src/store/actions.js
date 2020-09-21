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
  async registerThisMeetup(context, payload) {
    let postData = {
      eventName: payload.eventName,
      host: context.getters.user.name,
      details: payload.details,
      address: payload.address,
      date: payload.date,
      //TODO: use geocoding to translate address to location then send it in to database
      location: {
        type: 'Point',
        coordinates: [18.068, 59.329],
      },
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
