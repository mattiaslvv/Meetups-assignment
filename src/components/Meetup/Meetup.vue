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
    </ul>
  </div>
</template>
<script>
import Map from '../Map/Map.vue';
export default {
  name: 'Meetup',
  props: {
    meetup: {},
  },
  components: {
    Map,
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
