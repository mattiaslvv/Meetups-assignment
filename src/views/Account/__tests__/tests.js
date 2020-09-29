import {
  createLocalVue,
  shallowMount,
  mount,
  enableAutoDestroy,
} from '@vue/test-utils';
import Vuex from 'vuex';
import Account from '@/views/Account/Account.vue';
import VueRouter from 'vue-router';
import router from '@/router/index.js';
import Vue from 'vue';
import Vuetify from 'vuetify';

const localVue = createLocalVue();
localVue.use(VueRouter, Vuex);

//Destroy wrapper after each test
enableAutoDestroy(afterEach);

describe('User navigates to account page', () => {
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
  test('It renders correctly and matches snapshot', async () => {
    const store = new Vuex.Store({
      actions,
      state,
      getters,
    });
    const wrapper = mount(Account, {
      store,
      localVue,
      router,
      vuetify,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
