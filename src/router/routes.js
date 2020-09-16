//*********************/
//*** IMPORT VIEWS ***/
//*******************/
import Account from '../views/Account/Account.vue';
import Home from '../views/Home/Home.vue';
import Login from '../views/Login/Login.vue';
import Register from '../views/Register/Register.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Account',
    name: 'Account',
    component: Account,
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register,
  },
];

export default routes;
