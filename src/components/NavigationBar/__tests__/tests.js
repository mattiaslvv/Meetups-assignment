import {
  createLocalVue,
  shallowMount,
  mount,
  enableAutoDestroy,
  RouterLinkStub,
} from '@vue/test-utils';
import Vuex from 'vuex';
import NavigationBar from '@/components/NavigationBar/NavigationBar.vue';
import VueRouter from 'vue-router';
import store from '@/store/index.js';
import router from '@/router/index.js';
import Vuetify from 'vuetify';
import Vue from 'vue';

const localVue = createLocalVue();
localVue.use(VueRouter, Vuex);

//Destroy wrapper after each test
enableAutoDestroy(afterEach);

describe('User sees a navigational bar where he/she can click links to navigate the page', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
  });
  test('It renders correctly', async () => {
    //Arrange
    const wrapper = shallowMount(NavigationBar, {
      store,
      localVue,
      vuetify,
    });
    //Assert
    expect(wrapper.exists()).toBe(true);
  });
  test('Test so that all router links navigates properly', async () => {
    //Act
    const wrapper = shallowMount(NavigationBar, {
      store,
      localVue,
      vuetify,
      router,
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
    //Assert
    const routerLinks = wrapper.findAllComponents(RouterLinkStub);

    expect(routerLinks.at(0).props().to).toBe('/');
    expect(routerLinks.at(1).props().to).toBe('/Login');
    expect(routerLinks.at(2).props().to).toBe('/Register');
  });
  test('Test so that all router links navigates properly when logged in', async () => {
    //Arrange
    const getters = {
      isLoggedIn: () => true,
    };
    const actions = {
      logout: jest.fn(),
    };
    const store = new Vuex.Store({
      getters,
      actions,
    });
    const wrapper = shallowMount(NavigationBar, {
      store,
      localVue,
      vuetify,
      router,
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
    //Act
    const routerLinks = wrapper.findAllComponents(RouterLinkStub);

    //Assert
    expect(routerLinks.at(0).props().to).toBe('/');
    expect(routerLinks.at(1).props().to).toBe('/CreateMeetup');
    expect(routerLinks.at(2).props().to).toBe('/Account');
  });
  test('Test so that action logout is called when clicking logout button', async () => {
    //Arrange
    const getters = {
      isLoggedIn: () => true,
    };
    const actions = {
      logout: jest.fn(),
    };
    const store = new Vuex.Store({
      getters,
      actions,
    });
    const wrapper = mount(NavigationBar, {
      store,
      localVue,
      vuetify,
      router,
    });
    //Act
    const logoutBtn = wrapper.find('#logoutBtn');
    await logoutBtn.trigger('click');

    //Assert
    expect(actions.logout).toHaveBeenCalledTimes(1);
  });
});
