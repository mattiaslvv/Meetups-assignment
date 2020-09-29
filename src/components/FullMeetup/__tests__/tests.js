import {
  createLocalVue,
  shallowMount,
  mount,
  enableAutoDestroy,
} from '@vue/test-utils';
import Vuex from 'vuex';
import FullMeetup from '@/components/FullMeetup/FullMeetup.vue';
import VueRouter from 'vue-router';
import store from '@/store/index.js';
import router from '@/router/index.js';
import Vue from 'vue';
import Vuetify from 'vuetify';

const localVue = createLocalVue();
localVue.use(VueRouter, Vuex);

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

//Destroy wrapper after each test
enableAutoDestroy(afterEach);

describe('User navigates to the page to see information about a Meetup', () => {
  let vuetify;
  let state;
  let actions;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);

    state = {
      clickedMeetup: {
        _id: '123123123',
        location: {
          coordinates: [123, 123],
          type: 'Point',
        },
        attendees: ['Mattias'],
        reviews: [],
        eventName: 'Test',
        host: 'Test',
        details: 'Testing',
        time: '12:34',
        date: '2020-02-02',
        address: 'Test street 2',
      },
    };

    actions = {
      sendThisReview: jest.fn(),
      removeThisReview: jest.fn(),
      getThisMeetupWithId: jest.fn(),
      clearClickedMeetup: jest.fn(),
      attendThisMeetup: jest.fn(),
      removeAttendThisMeetup: jest.fn(),
    };
  });

  test('It should render the component', async () => {
    const wrapper = shallowMount(FullMeetup, {
      store,
      localVue,
      router,
      vuetify,
    });
    expect(wrapper.exists()).toBe(true);
  });
  test('Test so that review input is not displayed if already reviewed, instead remove review button should be displayed & removeThisReview called on click', async () => {
    //Arrange
    const getters = {
      clickedMeetup: (state) => {
        return state.clickedMeetup;
      },
      isAttending: jest.fn(),
      loading: jest.fn(),
      alreadyReviewed: () => {
        return true;
      },
      isLoggedIn: () => {
        return true;
      },
      getMapboxToken: jest.fn(),
    };

    const store = new Vuex.Store({
      actions,
      getters,
      state,
    });

    const wrapper = mount(FullMeetup, {
      store,
      localVue,
      router,
      vuetify,
    });
    //Act
    const possibleTextInput = wrapper.find('#reviewInput');
    const possibleRemoveReviewButton = wrapper.find('#removeReview');
    await possibleRemoveReviewButton.trigger('click');
    //Assert
    expect(possibleTextInput.exists()).toBe(false);
    expect(possibleRemoveReviewButton.exists()).toBe(true);
    expect(actions.removeThisReview).toHaveBeenCalledTimes(1);
  });
  test('Test so that review input is displayed if not already reviewed, add review button should be displayed & sendThisReview called on click', async () => {
    //Arrange
    const getters = {
      clickedMeetup: (state) => {
        return state.clickedMeetup;
      },
      isAttending: jest.fn(),
      loading: jest.fn(),
      alreadyReviewed: () => {
        return false;
      },
      isLoggedIn: () => {
        return true;
      },
      getMapboxToken: jest.fn(),
    };

    const store = new Vuex.Store({
      actions,
      getters,
      state,
    });

    const wrapper = mount(FullMeetup, {
      store,
      localVue,
      router,
      vuetify,
    });
    //Act
    const possibleSendReviewButton = wrapper.find('#sendReview');
    const possibleTextInput = wrapper.find('#reviewInput');
    await possibleSendReviewButton.trigger('click');

    //Assert
    expect(possibleSendReviewButton.exists()).toBe(true);
    expect(possibleTextInput.exists()).toBe(true);
    expect(actions.sendThisReview).toHaveBeenCalledTimes(1);
  });
  test('Test so that attending button is not rendering when already attending, removeAttend button should be displayed and removeThisAttendance action should be called on click', async () => {
    //Arrange
    const getters = {
      clickedMeetup: (state) => {
        return state.clickedMeetup;
      },
      isAttending: () => {
        return true;
      },
      loading: jest.fn(),
      alreadyReviewed: () => {
        return false;
      },
      isLoggedIn: () => {
        return true;
      },
      getMapboxToken: jest.fn(),
    };

    const store = new Vuex.Store({
      actions,
      getters,
      state,
    });

    const wrapper = mount(FullMeetup, {
      store,
      localVue,
      router,
      vuetify,
    });
    //Act
    const possibleAttendButton = wrapper.find('#sendAttend');
    const possibleRemoveAttendButton = wrapper.find('#removeAttend');
    await possibleRemoveAttendButton.trigger('click');
    //Assert
    expect(possibleAttendButton.exists()).toBe(false);
    expect(possibleRemoveAttendButton.exists()).toBe(true);
    expect(actions.removeAttendThisMeetup).toHaveBeenCalledTimes(1);
  });
  test('Test so that attend button is rendering when not attending, sendAttend button should be displayed and attendThisMeetup action should be called on click', async () => {
    //Arrange
    const getters = {
      clickedMeetup: (state) => {
        return state.clickedMeetup;
      },
      isAttending: () => {
        return false;
      },
      loading: jest.fn(),
      alreadyReviewed: () => {
        return false;
      },
      isLoggedIn: () => {
        return true;
      },
      getMapboxToken: jest.fn(),
    };

    const store = new Vuex.Store({
      actions,
      getters,
      state,
    });

    const wrapper = mount(FullMeetup, {
      store,
      localVue,
      router,
      vuetify,
    });
    //Act
    const possibleAttendButton = wrapper.find('#sendAttend');
    const possibleRemoveAttendButton = wrapper.find('#RemoveAttend');
    await possibleAttendButton.trigger('click');
    //Assert
    expect(possibleAttendButton.exists()).toBe(true);
    expect(possibleRemoveAttendButton.exists()).toBe(false);
    expect(actions.attendThisMeetup).toHaveBeenCalledTimes(1);
  });
});
