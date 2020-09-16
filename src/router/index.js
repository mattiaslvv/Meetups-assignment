import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes.js';
// import store from '../store/index.js';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

//************************************/
//*** NAVIGATION GUARDS FOR LOGIN ***/
//**********************************/

//Router navigation guards for login & account page

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!store.getters.isLoggedIn) {
//       // Redirect to the Login Page
//       next('/Login');
//     } else {
//       next();
//     }
//   } else if (to.matched.some((record) => record.meta.requiresGuest)) {
//     if (store.getters.isLoggedIn) {
//       // Redirect to the Login Page
//       next('/Account');
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router;
