<template>
  <v-container>
    <CreateMeetupForm />
  </v-container>
</template>
<script>
import CreateMeetupForm from '@/components/CreateMeetupForm/CreateMeetupForm.vue';
export default {
  name: 'CreateMeetup',
  components: {
    CreateMeetupForm,
  },
};
</script>
