import {
  createLocalVue,
  shallowMount,
  mount,
  enableAutoDestroy,
} from '@vue/test-utils';
import Vuex from 'vuex';
import CreateMeetup from '@/views/CreateMeetup/CreateMeetup.vue';
import VueRouter from 'vue-router';
import store from '@/store/index.js';
import router from '@/router/index.js';
import Vue from 'vue';
import Vuetify from 'vuetify';

const localVue = createLocalVue();
localVue.use(VueRouter, Vuex);

//Destroy wrapper after each test
enableAutoDestroy(afterEach);

describe('User navigates to createMeetup page', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
  });
  test('It renders correctly and matches snapshot', async () => {
    const wrapper = mount(CreateMeetup, {
      store,
      localVue,
      router,
      vuetify,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
