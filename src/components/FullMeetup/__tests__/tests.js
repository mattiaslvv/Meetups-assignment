import {
  createLocalVue,
  shallowMount,
  enableAutoDestroy,
} from '@vue/test-utils';
import Vuex from 'vuex';
import FullMeetup from '@/components/FullMeetup/FullMeetup.vue';
import VueRouter from 'vue-router';
import store from '@/store/index.js';
import router from '@/router/index.js';

const localVue = createLocalVue();
localVue.use(VueRouter, Vuex);

//Need to mock mapboxGL since component has BaseMap as child component (very strange)
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

describe('User navigates to the page to see information about a Meetup', () => {
  test('It should render the component', async () => {
    const wrapper = shallowMount(FullMeetup, {
      store,
      localVue,
      router,
    });
    expect(wrapper.exists()).toBe(true);
  });

  test('Test so that all outputs are representing what is in clickedMeetup object in store', async () => {
    //Arrange
    //Act
    //Assert
  });
  test('Test so that review input is not rendering when already commented', async () => {
    //Arrange
    //Act
    //Assert
  });
  test('Test so that action is called on clicking review post button', async () => {
    //Arrange
    //Act
    //Assert
  });
  test('Test so that attending button is not rendering when already attending', async () => {
    //Arrange
    //Act
    //Assert
  });
  test('Test so that attending button is not rendering when already attending', async () => {
    //Arrange
    //Act
    //Assert
  });
});
