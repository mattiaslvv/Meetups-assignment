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
  async sendThisReview(context, id, text) {
    await context.dispatch('sendReview', id, text);
  },
};

export default actions;
