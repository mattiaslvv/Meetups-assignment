<template>
  <div>
    <h2>My Profile</h2>
    <div v-if="user">
      <ul>
        <li>
          Email: <span>{{ user.email }}</span>
        </li>
        <li>
          Name: <span>{{ user.name }}</span>
        </li>
        <li>
          Username: <span>{{ user.username }}</span>
        </li>
        <li>
          Account created: <span>{{ user.date }}</span>
        </li>
        <h2 v-if="user.createdMeetups != ''">My created meetups:</h2>
        <li v-for="meetup in user.createdMeetups" :key="meetup._id">
          <span class="clickable" @click="viewFullMeetup(meetup._id)">{{
            meetup.eventName
          }}</span>
        </li>
        <h4 v-if="user.attendingMeetups != ''">Meetups I'm attending:</h4>
        <li
          v-for="attendingMeetup in user.attendingMeetups"
          :key="attendingMeetup.length"
        >
          Event:
          <span
            class="clickable"
            @click="viewFullMeetup(attendingMeetup._id)"
            >{{ attendingMeetup.meetupName }}</span
          >
          <button @click="removeAttendThisMeetup(attendingMeetup._id)">
            Remove attendance
          </button>
        </li>
        <h4 v-if="user.reviewHistory != ''">My review history:</h4>
        <li v-for="review in user.reviewHistory" :key="review.meetupName">
          Event:
          <span class="clickable" @click="viewFullMeetup(review._id)">{{
            review.meetupName
          }}</span>
          My review:
          <span>{{ review.review }}</span>
          <button @click="removeThisReview(review._id)">
            Remove review
          </button>
        </li>
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
    ...mapActions([
      'getProfile',
      'viewFullMeetup',
      'removeAttendThisMeetup',
      'removeThisReview',
    ]),
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

.clickable {
  cursor: pointer;
}
</style>
