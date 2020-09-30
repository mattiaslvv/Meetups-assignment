import axios from 'axios';

//**************************************/
//*** MAP & LOCATION API OPERATIONS ***/
//************************************/

//****************************/
//*** SET BASEURL FOR API ***/
//**************************/

const api = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
});

//********************/
//*** MAP ACTIONS ***/
//******************/

const actions = {
  async geocodeThisLocation(context, address) {
    let postData = {
      address: address,
      token: context.getters.getMapboxToken,
    };
    let res = await api.get(
      `${encodeURIComponent(postData.address)}.json?access_token=${
        postData.token
      }`
    );
    if (res.data.features.length > 0) {
      await context.commit('geocoding_success', res.data.features[0].geometry);
    }
    if (res.data.features.length == 0) {
      await context.commit('geocoding_fail');
    }
    return res;
  },
};

export default {
  actions,
};
