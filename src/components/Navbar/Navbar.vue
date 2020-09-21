<template>
  <nav>
    <span>Matrix Meetups</span>
    <router-link to="/" tag="button">Home</router-link>
    <router-link to="/Login" tag="button" v-if="!isLoggedIn">Login</router-link>
    <router-link to="/Register" tag="button" v-if="!isLoggedIn"
      >Register</router-link
    >
    <router-link to="/CreateMeetup" tag="button" v-if="isLoggedIn"
      >Create a Meetup!</router-link
    >
    <router-link to="/Account" tag="button" v-if="isLoggedIn"
      >My account</router-link
    >
    <button @click="logout" v-if="isLoggedIn">Logout</button>
  </nav>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'NavBar',
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    ...mapActions(['logout']),
  },
};
</script>
