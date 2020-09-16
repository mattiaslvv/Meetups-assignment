<template>
  <div>
    <RegisterForm />
    <router-link to="/Login" tag="button"
      ><i>Already have an account?</i></router-link
    >
  </div>
</template>
<script>
import RegisterForm from '@/components/RegisterForm/RegisterForm.vue';
export default {
  name: 'Register',
  components: {
    RegisterForm,
  },
};
</script>
