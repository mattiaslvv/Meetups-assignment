<template>
  <div>
    <LoginForm />
    <router-link to="/Register" tag="button"
      ><i>Not registered yet?</i></router-link
    >
  </div>
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
