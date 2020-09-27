import {
  createLocalVue,
  shallowMount,
  enableAutoDestroy,
} from '@vue/test-utils';
import Vuex from 'vuex';
import BaseMap from '@/components/BaseMap/BaseMap.vue';
import VueRouter from 'vue-router';
import store from '@/store/index.js';
import mapboxgl from 'mapbox-gl';
import Vuetify from 'vuetify';
import Vue from 'vue';

const localVue = createLocalVue();
localVue.use(VueRouter, Vuex);

//Mock mapbox-gl node module :)
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

//Destroy wrapper after each test
enableAutoDestroy(afterEach);

describe('Map renders when page is entered', () => {
  const coords = {
    lat: 18.005,
    long: 50.0,
  };
  let mapbox;
  let vuetify;
  beforeEach(() => {
    mapbox = mapboxgl;
    vuetify = new Vuetify();
    Vue.use(Vuetify);
  });
  const name = 'Testing this';
  test('Test so that mapboxgl renders on component creation', async () => {
    //Arrange
    const wrapper = shallowMount(BaseMap, {
      store,
      localVue,
      vuetify,
      propsData: {
        coords,
        name,
      },
    });

    //Assert
    //test so that mapboxgl map functions gets called on component creation
    expect(mapbox.Map).toHaveBeenCalledTimes(1);
    expect(mapbox.Marker).toHaveBeenCalledTimes(1);
    expect(mapbox.Popup).toHaveBeenCalledTimes(1);
  });
});
