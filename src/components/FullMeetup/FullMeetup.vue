<template>
  <div class="card" v-if="clickedMeetup">
    <img
      class="placeholder"
      src="https://placeimg.com/600/300/any"
      alt="Placeholder Image"
    />
    <ul>
      <li>Name: {{ clickedMeetup.eventName }}</li>
      <br />
      <li>Host: {{ clickedMeetup.host }}</li>
      <br />
      <li>Details: {{ clickedMeetup.details }}</li>
      <br />
      <li>When: {{ clickedMeetup.date }} time: {{ clickedMeetup.time }}</li>
      <br />
      <li>Where: {{ clickedMeetup.address }}</li>
      <br />
      <BaseMap
        v-if="clickedMeetup.location.coordinates.length != 0"
        :coords="{
          lat: clickedMeetup.location.coordinates[1],
          long: clickedMeetup.location.coordinates[0],
        }"
        :name="clickedMeetup.eventName"
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
import BaseMap from '../BaseMap/BaseMap.vue';
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
    BaseMap,
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
* {
  box-sizing: border-box;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.card {
  border: 1px solid black;
  margin: 0 auto;
}

.placeholder {
  margin: 15px;
}
</style>
