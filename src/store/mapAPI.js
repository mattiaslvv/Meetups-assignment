import axios from 'axios';

//**************************************/
//*** MAP & LOCATION API OPERATIONS ***/
//************************************/

//TODO: fix api coordinate operations
const api = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
});
const token = process.env.VUE_APP_MAPBOX_API_KEY;

const actions = {
  async geocodeLocation({ commit }, address) {
    let res = await api.get(
      `${encodeURIComponent(address)}.json?access_token=${token}`
    );
    if (res.data.features.length > 0) {
      await commit('geocoding_success', res.data.features[0].geometry);
    }
    if (res.data.features.length == 0) {
      await commit('geocoding_fail');
    }
    return res;
  },
};

export default {
  actions,
};
