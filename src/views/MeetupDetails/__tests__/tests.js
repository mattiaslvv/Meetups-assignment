import {
  createLocalVue,
  shallowMount,
  mount,
  enableAutoDestroy,
} from '@vue/test-utils';
import Vuex from 'vuex';
import MeetupDetails from '@/views/MeetupDetails/MeetupDetails.vue';
import VueRouter from 'vue-router';
import store from '@/store/index.js';
import router from '@/router/index.js';
import Vue from 'vue';
import Vuetify from 'vuetify';

const localVue = createLocalVue();
localVue.use(VueRouter, Vuex);

//Destroy wrapper after each test
enableAutoDestroy(afterEach);

//Need to mock mapboxGL since component has BaseMap as child component
jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn(),
    new: jest.fn(),
  })),
  NavigationControl: jest.fn(),
  Marker: jest.fn(() => ({
    setLngLat: jest.fn(),
    setPopup: jest.fn(),
    addTo: jest.fn(),
  })),
  Popup: jest.fn(() => ({
    setHTML: jest.fn(),
  })),
}));

describe('User navigates meetupdetails page', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
  });
  test('It renders correctly and matches snapshot', async () => {
    const wrapper = mount(MeetupDetails, {
      store,
      localVue,
      router,
      vuetify,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
