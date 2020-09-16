//******************************/
//*** ROUTES FOR VUE ROUTER ***/
//****************************/
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home/Home.vue'),
  },
  {
    path: '/Account',
    name: 'Account',
    component: () => import('../views/Account/Account.vue'),
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login/Login.vue'),
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('../views/Register/Register.vue'),
  },
];

export default routes;
