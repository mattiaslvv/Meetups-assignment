<template>
  <div class="card" v-if="clickedMeetup">
    <ul>
      <li>Name: {{ clickedMeetup.eventName }}</li>
      <br />
      <li>Host: {{ clickedMeetup.host }}</li>
      <br />
      <li>Details: {{ clickedMeetup.details }}</li>
      <br />
      <li>When: {{ clickedMeetup.date }}</li>
      <br />
      <li>Where: {{ clickedMeetup.address }}</li>
      <br />
      <Map
        :coords="{
          lat: clickedMeetup.location.coordinates[1],
          long: clickedMeetup.location.coordinates[0],
        }"
      />
      <br />
      <!-- TODO: Add map here for showing coordinates -->
      <li>Attending:</li>
      <p>{{ clickedMeetup.attendees.length }}</p>
      <li v-for="attendant in clickedMeetup.attendees" :key="attendant._id">
        {{ attendant }}
      </li>
      <!-- TODO: -if="isLoggedIn && !isAttending" -->
      <div v-if="isLoggedIn && !isAttending">
        <button @click="attendThisMeetup($route.params.id)">
          Attend this Meetup
        </button>
      </div>
      <!-- TODO: -if="isLoggedIn && isAttending" -->
      <div v-if="isLoggedIn && isAttending">
        <button @click="removeAttendThisMeetup($route.params.id)">
          I don't want to go anymore
        </button>
      </div>
      <br />
      <div>
        <li v-for="review in clickedMeetup.reviews" :key="review._id">
          {{ review.username }} commented: {{ review.text }}
        </li>
      </div>

      <div v-if="isLoggedIn && !alreadyReviewed">
        <textarea
          type="text"
          placeholder="Thoughts?"
          name="newReviewText"
          v-model="reviewText"
        />
        <button
          @click="sendThisReview({ _id: clickedMeetup._id, text: reviewText })"
        >
          Send review
        </button>
      </div>
      <div v-if="isLoggedIn && alreadyReviewed">
        <button @click="removeThisReview($route.params.id)">
          Remove review
        </button>
      </div>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Map from '../Map/Map.vue';
export default {
  name: 'Meetup',
  data() {
    return {
      reviewText: '',
    };
  },
  computed: {
    ...mapGetters([
      'isLoggedIn',
      'clickedMeetup',
      'isAttending',
      'alreadyReviewed',
    ]),
  },
  components: {
    Map,
  },
  methods: {
    ...mapActions([
      'sendThisReview',
      'removeThisReview',
      'getThisMeetupWithId',
      'clearClickedMeetup',
      'attendThisMeetup',
      'removeAttendThisMeetup',
    ]),
  },
  created() {
    this.getThisMeetupWithId(this.$route.params.id);
  },
  destroyed() {
    this.clearClickedMeetup();
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
</style>
