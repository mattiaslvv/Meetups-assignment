<template>
  <v-container class="d-flex flex-column align-center">
    <v-spacer />
    <LoginForm />
    <router-link to="/Register" tag="button"
      ><i>Not registered yet?</i></router-link
    >
  </v-container>
</template>
<script>
import LoginForm from '@/components/LoginForm/LoginForm.vue';
export default {
  name: 'Login',
  components: {
    LoginForm,
  },
};
</script>
