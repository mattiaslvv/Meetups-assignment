//***********************/
//*** GLOBAL ACTIONS ***/
//*********************/
import router from '../router';

const actions = {
  async viewFullMeetup(context, id) {
    router.push(`/MeetupDetails/${id}`);
  },
};

export default actions;
