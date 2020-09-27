import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css';
Vue.use(Vuetify);

// export default new Vuetify({ ... });

Vue.config.productionTip = false;

// Vue.use(vuetify);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
