import {
  createLocalVue,
  shallowMount,
  mount,
  enableAutoDestroy,
} from '@vue/test-utils';
import Vuex from 'vuex';
import UserPage from '@/components/UserPage/UserPage.vue';
import VueRouter from 'vue-router';
import store from '@/store/index.js';
import router from '@/router/index.js';
import Vue from 'vue';
import Vuetify from 'vuetify';

const localVue = createLocalVue();
localVue.use(VueRouter, Vuex);

//Destroy wrapper after each test
enableAutoDestroy(afterEach);

describe('User navigates to the page to find information about his/her account', () => {
  let vuetify, getters, actions, state;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    state = {
      user: {
        _id: '123123123123123123123',
        createdMeetups: [
          {
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
        ],
        attendingMeetups: [
          {
            _id: '123123123',
            eventName: 'Test',
          },
        ],
        reviewHistory: [
          {
            _id: '123123123',
            eventName: 'Test',
            review: 'Testing this test',
          },
        ],
        name: 'Testington',
        username: 'Testzor',
        password: 'NotThisTime!',
        email: 'Testboi@testing.test',
        date: '2020-09-27T00:04:53.496+00:00',
      },
    };

    getters = {
      user: () => state.user,
    };

    actions = {
      getProfile: jest.fn(),
      viewFullMeetup: jest.fn(),
      removeAttendThisMeetup: jest.fn(),
      removeThisReview: jest.fn(),
      removeThisMeetup: jest.fn(),
    };
  });

  test('It renders correctly', async () => {
    const store = new Vuex.Store({
      getters,
      actions,
      state,
    });
    const wrapper = mount(UserPage, {
      store,
      localVue,
      router,
      vuetify,
    });
    expect(wrapper.exists()).toBe(true);
  });

  test('Test so that api action getProfile is called on lifecycle hook created of component', async () => {
    //Arrange
    const store = new Vuex.Store({
      getters,
      actions,
      state,
    });

    const wrapper = mount(UserPage, {
      store,
      localVue,
      router,
      vuetify,
    });
    expect(actions.getProfile).toHaveBeenCalledTimes(1);
  });

  test('Test so that created meetups is only visible if user has created meetups, and remove meetup button calls action removeThisMeetup', async () => {
    //Arrange
    const store = new Vuex.Store({
      getters,
      actions,
      state,
    });

    const wrapper = mount(UserPage, {
      store,
      localVue,
      router,
      vuetify,
    });
    //Act
    const createdMeetups = wrapper.find('[data-test="createdMeetups"]');
    expect(createdMeetups.exists()).toBe(true);

    const removeMeetup = wrapper.find('#removeMeetup');
    await removeMeetup.trigger('click');
    expect(actions.removeThisMeetup).toHaveBeenCalledTimes(1);
  });

  test('Test so that attending meetups is only visible if user is attending a meetup, and remove attendance button calls action removeThisAttendance', async () => {
    //Arrange
    const store = new Vuex.Store({
      getters,
      actions,
      state,
    });

    const wrapper = mount(UserPage, {
      store,
      localVue,
      router,
      vuetify,
    });
    //Act
    const attendingMeetups = wrapper.find('[data-test="attendingMeetups"]');
    expect(attendingMeetups.exists()).toBe(true);

    const removeMeetup = wrapper.find('#removeAttendance');
    await removeMeetup.trigger('click');
    expect(actions.removeAttendThisMeetup).toHaveBeenCalledTimes(1);
  });

  test('Test so that review history is only visible if user has reviewed a meetup, and remove review button calls action removeThisReview', async () => {
    //Arrange
    const store = new Vuex.Store({
      getters,
      actions,
      state,
    });

    const wrapper = mount(UserPage, {
      store,
      localVue,
      router,
      vuetify,
    });
    //Act
    const reviewHistory = wrapper.find('[data-test="reviewHistory"]');
    expect(reviewHistory.exists()).toBe(true);

    const removeMeetup = wrapper.find('#removeReview');
    await removeMeetup.trigger('click');
    expect(actions.removeThisReview).toHaveBeenCalledTimes(1);
  });

  test('Test so that created meetups, attending meetups & reviewhistory is not visible since user has not created a meetup, is not attending a meetup and did not review a meetup', async () => {
    //Arrange
    state = {
      user: {
        _id: '123123123123123123123',
        createdMeetups: [],
        attendingMeetups: [],
        reviewHistory: [],
        name: 'Testington',
        username: 'Testzor',
        password: 'NotThisTime!',
        email: 'Testboi@testing.test',
        date: '2020-09-27T00:04:53.496+00:00',
      },
    };

    const store = new Vuex.Store({
      getters,
      actions,
      state,
    });

    const wrapper = mount(UserPage, {
      store,
      localVue,
      router,
      vuetify,
    });
    //Act
    const createdMeetups = wrapper.find('[data-test="createdMeetups"]');
    const attendingMeetups = wrapper.find('[data-test="attendingMeetups"]');
    const reviewHistory = wrapper.find('[data-test="reviewHistory"]');

    //Assert
    expect(createdMeetups.exists()).toBe(false);
    expect(attendingMeetups.exists()).toBe(false);
    expect(reviewHistory.exists()).toBe(false);
  });
});
