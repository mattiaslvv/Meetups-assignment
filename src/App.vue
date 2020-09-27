<template>
  <v-app id="app">
    <NavBar class="gradient" />
    <v-main>
      <Errors v-if="error" :msg="error" />
      <Errors v-if="meetupsError" :msg="meetupsError" />
      <router-view />
    </v-main>
    <Footer class="gradient" />
  </v-app>
</template>
<script>
import NavBar from '@/components/Navbar/Navbar.vue';
import Errors from '@/components/Errors/Errors.vue';
import Footer from '@/components/Footer/Footer.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'App',
  components: {
    NavBar,
    Footer,
    Errors,
  },
  computed: {
    ...mapGetters(['error', 'isLoggedIn', 'meetupsError']),
  },
  methods: {
    ...mapActions(['getProfile']),
  },
  created() {
    if (this.isLoggedIn) {
      this.getProfile();
    }
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css? family=Montserrat:300,400,700&display=swap');

$body-font-family: 'Raleway';

.v-application {
  font-family: $body-font-family, sans-serif !important;
}

.gradient {
  background: #485563; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #29323c,
    #485563
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #29323c,
    #485563
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
