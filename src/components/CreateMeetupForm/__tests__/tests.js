import {
  createLocalVue,
  shallowMount,
  enableAutoDestroy,
} from '@vue/test-utils';
import Vuex from 'vuex';
import CreateMeetupForm from '@/components/CreateMeetupForm/CreateMeetupForm.vue';
import VueRouter from 'vue-router';
import store from '@/store/index.js';
import { mapFields, getField, updateField } from 'vuex-map-fields';

const localVue = createLocalVue();
localVue.use(VueRouter, Vuex);

//Destroy wrapper after each test
enableAutoDestroy(afterEach);

describe('User navigates to the page and fills in forms to create a Meetup', () => {
  test('It should render the component', async () => {
    const wrapper = shallowMount(CreateMeetupForm, {
      store,
      localVue,
    });
    expect(wrapper.exists()).toBe(true);
  });

  test('Test so that all input types are properly v-modeled in state', async () => {
    //Arrange
    const wrapper = shallowMount(CreateMeetupForm, {
      store,
      localVue,
    });
    //Act
    const eventName = wrapper.find('#eventName');
    const details = wrapper.find('#details');
    const address = wrapper.find('#address');
    const date = wrapper.find('#date');
    const time = wrapper.find('#time');
    eventName.setValue('Test Event');
    details.setValue('Testing events in testing, testception');
    address.setValue('Testing Lane 123');
    date.setValue('2020-09-03');
    time.setValue('20:30');
    //Assert
    expect(store.state.meetupForm.eventName).toBe(eventName.element.value);
    expect(store.state.meetupForm.details).toBe(details.element.value);
    expect(store.state.meetupForm.address).toBe(address.element.value);
    expect(store.state.meetupForm.date).toBe(date.element.value);
    expect(store.state.meetupForm.time).toBe(time.element.value);
  });
  test('Test so that action to register Meetup is called on button click', async () => {
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
    const wrapper = shallowMount(CreateMeetupForm, {
      store,
      localVue,
      computed: {
        ...mapFields([
          'meetupForm.eventName',
          'meetupForm.details',
          'meetupForm.address',
          'meetupForm.date',
        ]),
      },
    });
    //Act
    const button = wrapper.find('button');
    await button.trigger('click');
    //Assert
    expect(actions.registerThisMeetup).toHaveBeenCalledTimes(1);
  });
});
