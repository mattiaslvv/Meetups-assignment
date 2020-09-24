<template>
  <div class="card clickable" @click="viewFullMeetup(meetup._id)">
    <ul>
      <li>Name: {{ meetup.eventName }}</li>
      <br />
      <li>Host: {{ meetup.host }}</li>
      <br />
      <li>When: {{ meetup.date }}</li>
      <br />
      <li>Where: {{ meetup.address }}</li>
      <br />
    </ul>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'Meetup',
  data() {
    return {
      reviewText: '',
    };
  },
  props: {
    meetup: {},
  },
  methods: {
    ...mapActions(['viewFullMeetup']),
  },
};
</script>
<style scoped>
.card {
  border: 1px solid black;
}

ul {
  list-style: none;
}

.clickable {
  cursor: pointer;
}
</style>
