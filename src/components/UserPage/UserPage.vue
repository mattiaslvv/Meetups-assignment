<template>
  <div>
    <h2>My Profile</h2>
    <div v-if="user">
      <ul>
        <li>Email: {{ user.email }}</li>
        <li>Name: {{ user.name }}</li>
        <li>Username: {{ user.username }}</li>
        <li>Account created: {{ user.date }}</li>
        <h2 v-if="user.meetups">My created meetups:</h2>
        <li v-for="meetup in user.meetups" :key="meetup._id">{{ meetup }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'UserPage',
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    ...mapActions(['getProfile']),
  },
  created() {
    this.getProfile();
  },
};
</script>
<style scoped>
ul {
  list-style: none;
}
</style>
