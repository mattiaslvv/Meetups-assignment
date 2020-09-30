import {
  createLocalVue,
  shallowMount,
  mount,
  enableAutoDestroy,
} from '@vue/test-utils';
import Vuex from 'vuex';
import Meetup from '@/components/Meetup/Meetup.vue';
import VueRouter from 'vue-router';
import store from '@/store/index.js';
import router from '@/router/index.js';
import Vue from 'vue';
import Vuetify from 'vuetify';

const localVue = createLocalVue();
localVue.use(VueRouter, Vuex);

//Destroy wrapper after each test
enableAutoDestroy(afterEach);

describe('User navigates to home page and finds short information about all the meetups', () => {
  let vuetify;

  //Mock API data from database
  const meetup = {
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
  };

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
  });

  test('It should render the component', async () => {
    //Arrange
    const wrapper = mount(Meetup, {
      store,
      localVue,
      vuetify,
      router,
      propsData: {
        meetup: meetup,
      },
    });
    //Assert
    expect(wrapper.exists()).toBe(true);
  });

  test('Clicking button should trigger action viewFullMeetup', async () => {
    //Arrange
    const actions = {
      viewFullMeetup: jest.fn(),
    };

    const store = new Vuex.Store({
      actions,
    });

    const wrapper = mount(Meetup, {
      store,
      localVue,
      vuetify,
      router,
      propsData: {
        meetup: meetup,
      },
    });
    //Act
    const button = wrapper.find('#viewFullMeetup');
    await button.trigger('click');

    //Assert
    expect(actions.viewFullMeetup).toHaveBeenCalledTimes(1);
  });
});
