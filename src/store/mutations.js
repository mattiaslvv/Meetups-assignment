import { updateField } from 'vuex-map-fields';
//*************************/
//*** GLOBAL MUTATIONS ***/
//***********************/
const mutations = {
  updateField,
  geocoding_success(state, geometry) {
    state.meetupForm.location = geometry;
    console.log(state.meetupForm.location);
  },
  geocoding_fail(state) {
    state.meetupForm.location = null;
  },
};

export default mutations;
