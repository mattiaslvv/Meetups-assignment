import {
  createLocalVue,
  shallowMount,
  mount,
  enableAutoDestroy,
} from '@vue/test-utils';
import Vuex from 'vuex';
import CreateMeetupForm from '@/components/CreateMeetupForm/CreateMeetupForm.vue';
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

describe('User navigates to the page and fills in forms to create a Meetup', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    Vue.use(Vuelidate);
  });

  test('It should render the component', async () => {
    const wrapper = mount(CreateMeetupForm, {
      store,
      localVue,
      vuetify,
    });
    expect(wrapper.exists()).toBe(true);
  });

  test('Test so that all input types are properly v-modeled in state', async () => {
    //Arrange
    const wrapper = mount(CreateMeetupForm, {
      store,
      localVue,
      vuetify,
      setData: {
        menu: true,
        timeMenu: true,
        checkbox: true,
      },
    });
    //Act
    const eventName = wrapper.find('#eventName');
    const details = wrapper.find('#details');
    const address = wrapper.find('#address');
    const time = wrapper.find('#time');
    const date = wrapper.find('#date');

    eventName.setValue('Testing this');
    details.setValue('Testing events in testing, testception');
    address.setValue('Testing Lane 123');
    date.setValue('2020-09-03');
    time.setValue('20:30');
    await wrapper.vm.$nextTick();
    //Assert
    expect(store.state.meetupForm.eventName).toBe(eventName.element.value);
    expect(store.state.meetupForm.details).toBe(details.element.value);
    expect(store.state.meetupForm.address).toBe(address.element.value);
    expect(store.state.meetupForm.date).toBe(date.element.value);
    expect(store.state.meetupForm.time).toBe(time.element.value);
  });
  test('Test so that validation is in place and createMeetup does not go through if fields are empty/invalid', async () => {
    //Arrange
    const wrapper = mount(CreateMeetupForm, {
      store,
      localVue,
      vuetify,
      computed: {
        ...mapFields([
          'meetupForm.eventName',
          'meetupForm.details',
          'meetupForm.address',
          'meetupForm.date',
        ]),
      },
      setData: {
        menu: true,
        timeMenu: true,
        checkbox: false,
      },
    });
    //Act
    const submitStatus = wrapper.find('#submitStatus');
    const button = wrapper.find('#createMeetup');
    await wrapper.vm.$v.$touch();
    await button.trigger('click');
    //Assert
    expect(submitStatus.element.innerHTML).toContain('Must fill in all fields');
    expect(wrapper.vm.$v.$invalid).toBe(true);
  });
  test('Test so that validation is in place and createMeetup does go through if fields are filled in and valid', async () => {
    //Arrange
    const state = {
      meetupForm: {
        eventName: '',
        host: '',
        details: '',
        date: '',
        address: '',
        location: {},
      },
    };

    const actions = {
      registerThisMeetup: jest.fn(),
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
    const wrapper = mount(CreateMeetupForm, {
      store,
      localVue,
      vuetify,
      computed: {
        ...mapFields([
          'meetupForm.eventName',
          'meetupForm.details',
          'meetupForm.address',
          'meetupForm.date',
        ]),
      },
      setData: {
        menu: true,
        timeMenu: true,
        $invalid: false,
      },
    });
    //Act
    const eventName = wrapper.find('#eventName');
    const details = wrapper.find('#details');
    const address = wrapper.find('#address');
    const time = wrapper.find('#time');
    const date = wrapper.find('#date');
    const submitStatus = wrapper.find('#submitStatus');
    const button = wrapper.find('#createMeetup');
    const checkBox = wrapper.find('#checkBox');

    eventName.element.value = 'Testing this';
    eventName.trigger('input');
    details.element.value = 'Testing events in testing, testception';
    details.trigger('input');
    address.element.value = 'Testing Lane 123';
    address.trigger('input');
    date.element.value = '2020-09-03';
    date.trigger('input');
    time.element.value = '05:05';
    time.trigger('input');
    checkBox.trigger('change');
    button.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$v.eventName.$invalid).toBe(false);
    expect(wrapper.vm.$v.details.$invalid).toBe(false);
    expect(wrapper.vm.$v.address.$invalid).toBe(false);
    expect(wrapper.vm.$v.date.$invalid).toBe(false);
    expect(wrapper.vm.$v.checkbox.$invalid).toBe(false);
    expect(wrapper.vm.$v.$invalid).toBe(false);

    //Assert
    expect(submitStatus.element.innerHTML).not.toContain(
      'Must fill in all fields'
    );
    expect(actions.registerThisMeetup).toHaveBeenCalled();
  });
});
