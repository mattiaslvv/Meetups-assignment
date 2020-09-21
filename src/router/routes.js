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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/CreateMeetup',
    name: 'CreateMeetup',
    component: () => import('../views/CreateMeetup/CreateMeetup.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login/Login.vue'),
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('../views/Register/Register.vue'),
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: '/MeetupDetails/:id',
    name: 'MeetupDetails',
    component: () => import('../views/MeetupDetails/MeetupDetails.vue'),
  },
];

export default routes;
