import {
  createLocalVue,
  shallowMount,
  mount,
  enableAutoDestroy,
} from '@vue/test-utils';
import Vuex from 'vuex';
import MeetupList from '@/components/MeetupList/MeetupList.vue';
import VueRouter from 'vue-router';
import store from '@/store/index.js';
import router from '@/router/index.js';
import Vue from 'vue';
import Vuetify from 'vuetify';

const localVue = createLocalVue();
localVue.use(VueRouter, Vuex);

//Destroy wrapper after each test
enableAutoDestroy(afterEach);

describe('User visits home page to see all the meetups', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
  });
  test('It renders correctly', async () => {
    const wrapper = mount(MeetupList, {
      store,
      localVue,
      vuetify,
      router,
    });
    expect(wrapper.exists()).toBe(true);
  });
  test('It makes an API call on lifecycle hook created', async () => {
    //Arrange
    const actions = {
      getAllMeetups: jest.fn(),
    };

    const getters = {
      filteredMeetups: jest.fn(),
    };

    const store = new Vuex.Store({
      actions,
      getters,
    });
    const wrapper = mount(MeetupList, {
      store,
      localVue,
      vuetify,
      router,
    });
    //Assert
    expect(actions.getAllMeetups).toHaveBeenCalledTimes(1);
  });
});
