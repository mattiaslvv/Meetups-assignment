import {
  createLocalVue,
  shallowMount,
  mount,
  enableAutoDestroy,
} from '@vue/test-utils';
import Vuex from 'vuex';
import LoginForm from '@/components/LoginForm/LoginForm.vue';
import VueRouter from 'vue-router';
import store from '@/store/index.js';
import { mapFields, getField, updateField } from 'vuex-map-fields';
import Vue from 'vue';
import Vuetify from 'vuetify';
import { Vuelidate } from 'vuelidate';

const localVue = createLocalVue();
localVue.use(VueRouter, Vuex);

//Destroy wrapper after each test
enableAutoDestroy(afterEach);

describe('User navigates to the page to enter his/her credentials to log in', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuelidate);
  });

  test('It should render the component', async () => {
    const wrapper = mount(LoginForm, {
      store,
      localVue,
      vuetify,
    });
    expect(wrapper.exists()).toBe(true);
  });

  test('Test so that all input types are properly v-modeled in state', async () => {
    //Arrange
    const wrapper = mount(LoginForm, {
      store,
      localVue,
      vuetify,
    });
    //Act
    const username = wrapper.find('#username');
    const password = wrapper.find('#password');

    username.setValue('Testing');
    password.setValue('qwerty123');
    await wrapper.vm.$nextTick();
    //Assert
    expect(store.state.loginForm.username).toBe(username.element.value);
    expect(store.state.loginForm.password).toBe(password.element.value);
  });

  test('Test so that login action is called when form is valid', async () => {
    //Arrange
    const wrapper = mount(LoginForm, {
      store,
      localVue,
      vuetify,
      computed: {
        ...mapFields(['loginForm.username', 'loginForm.password']),
      },
    });
    //Act
    const loginBtn = wrapper.find('#loginBtn');
    await loginBtn.trigger('click');

    const username = wrapper.find('#username');
    const password = wrapper.find('#password');

    username.setValue('');
    password.setValue('');
    await wrapper.vm.$nextTick();
    //Assert
    expect(wrapper.vm.$v.$invalid).toBe(true);
  });

  test('Test so that validation is in place and login does not go through if fields are empty/invalid', async () => {
    //Arrange
    const actions = {
      loginThisUser: jest.fn(),
    };

    const state = {
      loginForm: {
        username: '',
        password: '',
      },
    };

    const getters = {
      getField,
    };

    const mutations = {
      updateField,
    };

    const store = new Vuex.Store({
      actions,
      getters,
      mutations,
      state,
    });
    const wrapper = mount(LoginForm, {
      store,
      localVue,
      vuetify,
      computed: {
        ...mapFields(['loginForm.username', 'loginForm.password']),
      },
    });
    //Act
    const loginBtn = wrapper.find('#loginBtn');
    const username = wrapper.find('#username');
    const password = wrapper.find('#password');

    username.element.value = 'Test';
    password.element.value = 'Testing';
    username.trigger('input');
    password.trigger('input');
    await loginBtn.trigger('click');
    await wrapper.vm.$nextTick();
    //Assert
    expect(wrapper.vm.$v.$invalid).toBe(false);
    expect(actions.loginThisUser).toHaveBeenCalledTimes(1);
  });
});
