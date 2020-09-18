<template>
  <div id="app">
    <NavBar />
    <Errors v-if="error" :msg="error" />
    <router-view />
    <Footer />
  </div>
</template>
<script>
import NavBar from '@/components/Navbar/Navbar.vue';
import Errors from '@/components/Errors/Errors.vue';
import Footer from '@/components/Footer/Footer.vue';
import { mapGetters } from 'vuex';
export default {
  name: 'App',
  components: {
    NavBar,
    Footer,
    Errors,
  },
  computed: {
    ...mapGetters(['error']),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
