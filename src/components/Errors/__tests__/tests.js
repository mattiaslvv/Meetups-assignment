import {
  createLocalVue,
  shallowMount,
  enableAutoDestroy,
} from '@vue/test-utils';
import Vuex from 'vuex';
import Errors from '@/components/Errors/Errors.vue';
import VueRouter from 'vue-router';
import store from '@/store/index.js';

const localVue = createLocalVue();
localVue.use(VueRouter, Vuex);

//Destroy wrapper after each test
enableAutoDestroy(afterEach);

describe('User does something wrong and gets a faulty API response with a message', () => {
  test('It should render the component', async () => {
    //Arrange
    const wrapper = shallowMount(Errors, {
      store,
      localVue,
    });
    //Assert
    expect(wrapper.exists()).toBe(true);
  });
  test('Output in component should be representative of what the prop contains', async () => {
    //Arrange
    const testMessage = 'Testing this test thing';
    const wrapper = shallowMount(Errors, {
      store,
      localVue,
      propsData: {
        msg: testMessage,
      },
    });

    //Act
    const output = wrapper.find('.msg');

    //Assert
    expect(output.element.innerHTML).toContain(testMessage);
  });
});
