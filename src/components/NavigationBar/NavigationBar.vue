<template>
  <v-app-bar app dark sticky>
    <v-container class="d-flex align-center">
      <v-img
        alt="Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />
      <span>Matrix Meetups</span>
    </v-container>
    <v-container class="d-flex justify-space-around" data-cy="nav">
      <router-link to="/" tag="button" class="font-weight-bold"
        >Home</router-link
      >
      <router-link
        to="/Login"
        tag="button"
        v-if="!isLoggedIn"
        class="font-weight-bold"
        >Login</router-link
      >
      <router-link
        to="/Register"
        tag="button"
        v-if="!isLoggedIn"
        class="font-weight-bold"
        >Register</router-link
      >
      <router-link
        to="/CreateMeetup"
        tag="button"
        v-if="isLoggedIn"
        class="font-weight-bold"
        >Create a Meetup!</router-link
      >
      <router-link
        to="/Account"
        tag="button"
        v-if="isLoggedIn"
        class="font-weight-bold"
        >My account</router-link
      >
      <v-btn
        color="orange"
        id="logoutBtn"
        @click="logout"
        v-if="isLoggedIn"
        class="font-weight-bold"
        >Logout<v-icon>mdi-logout</v-icon></v-btn
      >
    </v-container>
  </v-app-bar>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'NavigationBar',
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    ...mapActions(['logout']),
  },
};
</script>
<style scoped>
button {
  transition: 0.3s;
  opacity: 0.9;
  border: none;
  outline: none;
}

button:hover {
  opacity: 1;
}
.router-link-exact-active {
  color: #ff9800;
}
</style>
