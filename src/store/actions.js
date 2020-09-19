//***********************/
//*** GLOBAL ACTIONS ***/
//*********************/
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
    const newPayload = {
      _id: id,
      text: text,
      username: username,
    };
    context.dispatch('sendReview', newPayload);
  },
};

export default actions;
