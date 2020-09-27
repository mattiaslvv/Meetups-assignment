import {
  createLocalVue,
  shallowMount,
  enableAutoDestroy,
} from '@vue/test-utils';
import Vuex from 'vuex';
import Footer from '@/components/Footer/Footer.vue';
import VueRouter from 'vue-router';
import store from '@/store/index.js';
import Vue from 'vue';
import Vuetify from 'vuetify';

const localVue = createLocalVue();
localVue.use(VueRouter, Vuex);

//Destroy wrapper after each test
enableAutoDestroy(afterEach);

describe('User navigates the page and sees the footer', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
  });

  test('It should render the component', async () => {
    //Arrange
    const wrapper = shallowMount(Footer, {
      store,
      localVue,
    });
    //Assert
    expect(wrapper.exists()).toBe(true);
  });
});
