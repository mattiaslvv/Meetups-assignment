import { updateField } from 'vuex-map-fields';
//*************************/
//*** GLOBAL MUTATIONS ***/
//***********************/
const mutations = {
  updateField,
  geocoding_success(state, geometry) {
    state.meetupForm.location = geometry;
  },
  geocoding_fail(state) {
    state.meetupForm.location = null;
  },
};

export default mutations;
