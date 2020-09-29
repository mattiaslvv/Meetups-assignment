import {
  createLocalVue,
  shallowMount,
  mount,
  enableAutoDestroy,
} from '@vue/test-utils';
import Vuex from 'vuex';
import SearchBar from '@/components/SearchBar/SearchBar.vue';
import VueRouter from 'vue-router';
import store from '@/store/index.js';
import { mapFields, getField, updateField } from 'vuex-map-fields';
import Vue from 'vue';
import Vuetify from 'vuetify';

const localVue = createLocalVue();
localVue.use(VueRouter, Vuex);

//Destroy wrapper after each test
enableAutoDestroy(afterEach);

describe('User enters a searchword and expects to find results matching the searchword', () => {
  let vuetify;
  let store, mutations, actions, state;

  beforeEach(() => {
    vuetify = new Vuetify();
    Vue.use(Vuetify);
    state = {
      allMeetups: [
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
        {
          _id: '141414141414',
          location: {
            coordinates: [122, 122],
            type: 'Point',
          },
          attendees: ['Neo'],
          reviews: [],
          eventName: 'EnterTheMatrix',
          host: 'Neo',
          details: 'Testing',
          time: '12:34',
          date: '2020-02-02',
          address: 'Test street 8',
        },
      ],
      filteredMeetups: [],
    };
    actions = {
      async getByThisKeyword({ commit }, keyword) {
        commit('get_by_keyword', keyword);
      },
      async displayAllMeetups({ commit }) {
        commit('display_all_meetups');
      },
    };
    mutations = {
      get_by_keyword(state, keyword) {
        let search = keyword.toLowerCase();
        if (!search.length) {
          state.filteredMeetups = state.allMeetups;
        } else {
          let foundMeetups = [];
          foundMeetups = state.allMeetups.filter((item) => {
            let lowercase = item.eventName.toLowerCase();
            return lowercase.match(search);
          });
          state.filteredMeetups = foundMeetups;
        }
      },
      display_all_meetups(state) {
        state.filteredMeetups = state.allMeetups;
      },
    };
  });

  test('It renders correctly', async () => {
    const wrapper = mount(SearchBar, {
      store,
      localVue,
      vuetify,
    });
    expect(wrapper.exists()).toBe(true);
  });

  test('Test so that empty input makes Store.filteredMeetups full with all products', async () => {
    //Arrange
    const store = new Vuex.Store({
      actions,
      mutations,
      state,
    });
    const wrapper = mount(SearchBar, {
      store,
      localVue,
      vuetify,
    });
    //Act
    const input = wrapper.find('#searchBar');
    input.element.value = '';
    input.trigger('keyup');
    //Assert
    expect(state.filteredMeetups.length).toBe(2);
  });

  test('Test so that searchword returns items with matching letters', async () => {
    //Arrange
    const store = new Vuex.Store({
      actions,
      mutations,
      state,
    });
    const wrapper = mount(SearchBar, {
      store,
      localVue,
      vuetify,
    });
    //Act
    const input = wrapper.find('#searchBar');
    input.element.value = 'Matrix';
    input.trigger('keyup');
    //Assert
    //Find object containing eventname: 'EnterTheMatrix' in array
    expect(state.filteredMeetups).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          eventName: 'EnterTheMatrix',
        }),
      ])
    );
  });

  test('Test so that case sensitivity does not impact search result', async () => {
    //Arrange
    const store = new Vuex.Store({
      actions,
      mutations,
      state,
    });
    const wrapper = mount(SearchBar, {
      store,
      localVue,
      vuetify,
    });
    //Act
    const input = wrapper.find('#searchBar');
    input.element.value = 'MaTriX';
    input.trigger('keyup');
    //Assert
    //Find object containing eventname: 'EnterTheMatrix' in array
    expect(state.filteredMeetups).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          eventName: 'EnterTheMatrix',
        }),
      ])
    );
  });
});
