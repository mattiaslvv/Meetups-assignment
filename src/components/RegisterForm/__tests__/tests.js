import {
  createLocalVue,
  shallowMount,
  mount,
  enableAutoDestroy,
} from '@vue/test-utils';
import Vuex from 'vuex';
import RegisterForm from '@/components/RegisterForm/RegisterForm.vue';
import VueRouter from 'vue-router';
import store from '@/store/index.js';
import { mapFields, getField, updateField } from 'vuex-map-fields';
import Vue from 'vue';
import Vuetify from 'vuetify';
import { Vuelidate } from 'vuelidate';
import router from '@/router/index.js';

const localVue = createLocalVue();
localVue.use(VueRouter, Vuex);

//Destroy wrapper after each test
enableAutoDestroy(afterEach);

describe('User navigates to the page and fills in the form to register a new account', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuelidate);
  });

  test('It renders correctly', async () => {
    const wrapper = mount(RegisterForm, {
      store,
      localVue,
      vuetify,
    });
    expect(wrapper.exists()).toBe(true);
  });
  test('Test so that everything is properly v-modeled against state', async () => {
    //Arrange
    const wrapper = mount(RegisterForm, {
      store,
      localVue,
      vuetify,
    });
    //Act
    const name = wrapper.find('#name');
    const next = wrapper.find('#next');

    //Divided into 4 sections since register uses v-window with 4 steps
    //Name step 1
    expect(wrapper.vm.step).toBe(1);
    name.element.value = 'Test McTestington';
    name.trigger('input');
    expect(store.state.registerForm.name).toBe(name.element.value);
    await next.trigger('click');
    await localVue.nextTick();
    //Password step 2
    expect(wrapper.vm.step).toBe(2);
    const password = wrapper.find('#password');
    const confirm_password = wrapper.find('#confirm_password');
    password.element.value = 'Testoroids';
    password.trigger('input');
    confirm_password.element.value = 'Testoroids';
    confirm_password.trigger('input');
    expect(store.state.registerForm.password).toBe(password.element.value);
    expect(store.state.registerForm.confirm_password).toBe(
      confirm_password.element.value
    );
    await next.trigger('click');
    await localVue.nextTick();
    //Email step 3
    expect(wrapper.vm.step).toBe(3);
    const email = wrapper.find('#email');
    email.element.value = 'test@test.com';
    email.trigger('input');
    expect(store.state.registerForm.email).toBe(email.element.value);
    await next.trigger('click');
    await localVue.nextTick();
    //Username step 4
    expect(wrapper.vm.step).toBe(4);
    const username = wrapper.find('#username');
    username.element.value = 'xXxTestboixXx';
    username.trigger('input');
    expect(store.state.registerForm.username).toBe(username.element.value);
  });
  test('Test so that validation is in place and register wont go through if form is invalid', async () => {
    //Arrange
    const wrapper = mount(RegisterForm, {
      store,
      localVue,
      vuetify,
      router,
    });
    //Act
    const name = wrapper.find('#name');
    const next = wrapper.find('#next');

    //Divided into 4 sections since register uses v-window with 4 steps
    //Name step 1
    expect(wrapper.vm.step).toBe(1);
    name.element.value = '';
    name.trigger('input');
    await next.trigger('click');
    await localVue.nextTick();
    //Password step 2
    expect(wrapper.vm.step).toBe(2);
    const password = wrapper.find('#password');
    const confirm_password = wrapper.find('#confirm_password');
    password.element.value = '';
    password.trigger('input');
    confirm_password.element.value = '';
    confirm_password.trigger('input');
    await next.trigger('click');
    await localVue.nextTick();
    //Email step 3
    expect(wrapper.vm.step).toBe(3);
    const email = wrapper.find('#email');
    email.element.value = '';
    email.trigger('input');
    await next.trigger('click');
    await localVue.nextTick();
    //Username step 4
    expect(wrapper.vm.step).toBe(4);
    const username = wrapper.find('#username');
    username.element.value = '';
    username.trigger('input');
    const registerBtn = wrapper.find('#register');
    await registerBtn.trigger('click');
    const submitStatus = wrapper.find('#submitStatus');
    expect(submitStatus.element.innerHTML).toContain('Must fill in all fields');
    expect(wrapper.vm.$v.$invalid).toBe(true);
  });
  test('Test so that action register is called when clicking register button and form is valid', async () => {
    //Arrange
    const state = {
      registerForm: {
        name: '',
        password: '',
        confirm_password: '',
        email: '',
        username: '',
      },
    };

    const actions = {
      registerThisUser: jest.fn(),
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
      state,
      mutations,
    });
    const wrapper = mount(RegisterForm, {
      store,
      localVue,
      vuetify,
      router,
    });
    //Act
    const name = wrapper.find('#name');
    const next = wrapper.find('#next');

    //Divided into 4 sections since register uses v-window with 4 steps
    //Name step 1
    expect(wrapper.vm.step).toBe(1);
    name.element.value = 'Test McTestington';
    name.trigger('input');
    await next.trigger('click');
    await localVue.nextTick();
    //Password step 2
    expect(wrapper.vm.step).toBe(2);
    const password = wrapper.find('#password');
    const confirm_password = wrapper.find('#confirm_password');
    password.element.value = 'Testoroids';
    password.trigger('input');
    confirm_password.element.value = 'Testoroids';
    confirm_password.trigger('input');
    await next.trigger('click');
    await localVue.nextTick();
    //Email step 3
    expect(wrapper.vm.step).toBe(3);
    const email = wrapper.find('#email');
    email.element.value = 'test@test.com';
    email.trigger('input');
    await next.trigger('click');
    await localVue.nextTick();
    //Username step 4
    expect(wrapper.vm.step).toBe(4);
    const username = wrapper.find('#username');
    username.element.value = 'xXxTestboixXx';
    username.trigger('input');
    const registerBtn = wrapper.find('#register');
    await registerBtn.trigger('click');
    const submitStatus = wrapper.find('#submitStatus');

    expect(submitStatus.element.innerHTML).not.toContain(
      'Must fill in all fields'
    );
    expect(wrapper.vm.$v.name.$invalid).toBe(false);
    expect(wrapper.vm.$v.password.$invalid).toBe(false);
    expect(wrapper.vm.$v.confirm_password.$invalid).toBe(false);
    expect(wrapper.vm.$v.email.$invalid).toBe(false);
    expect(wrapper.vm.$v.username.$invalid).toBe(false);
    expect(wrapper.vm.$v.$invalid).toBe(false);
    expect(actions.registerThisUser).toHaveBeenCalledTimes(1);
  });
});
