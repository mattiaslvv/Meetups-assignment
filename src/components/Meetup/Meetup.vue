<template>
  <div class="card">
    <ul>
      <li>Name: {{ meetup.eventName }}</li>
      <br />
      <li>Host: {{ meetup.host }}</li>
      <br />
      <li>Details: {{ meetup.details }}</li>
      <br />
      <li>When: {{ meetup.date }}</li>
      <br />
      <li>Where: {{ meetup.address }}</li>
      <br />
      <Map
        :coords="{
          lat: meetup.location.coordinates[1],
          long: meetup.location.coordinates[0],
        }"
      />
      <br />
      <!-- TODO: Add map here for showing coordinates -->
      <li>Attending:</li>
      <p>{{ meetup.attendees.length }}</p>
      <li v-for="attendant in meetup.attendees" :key="attendant._id">
        {{ attendant }}
      </li>
      <br />
      <div>
        <li v-for="review in meetup.reviews" :key="review._id">
          {{ review.username }} commented: {{ review.text }}
        </li>
      </div>
      <div v-if="isLoggedIn">
        <label for="newReviewText">Review</label>
        <input
          type="text"
          id="newReviewText"
          placeholder="Thoughts?"
          name="newReviewText"
          v-model="text"
        />
        <button @click="sendThisReview(meetup._id, text)">
          Send review
        </button>
      </div>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import Map from '../Map/Map.vue';
export default {
  name: 'Meetup',
  computed: {
    ...mapGetters(['isLoggedIn']),
    ...mapFields(['newReview.text']),
  },
  props: {
    meetup: {},
  },
  components: {
    Map,
  },
  methods: {
    ...mapActions(['sendThisReview']),
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
