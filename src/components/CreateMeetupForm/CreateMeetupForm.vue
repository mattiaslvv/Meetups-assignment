<template>
  <div>
    <form class="create-meetup-form">
      <div class="form-eventName">
        <label for="eventName">Meetup name</label>
        <input
          type="text"
          id="eventName"
          placeholder="Meetup name"
          name="eventName"
          v-model="eventName"
        />
      </div>
      <div class="form-details">
        <label for="details">Details</label>
        <textarea
          type="text"
          id="details"
          placeholder="Details..."
          name="details"
          v-model="details"
        />
      </div>
      <div class="form-address">
        <label for="address">Address</label>
        <input
          type="text"
          id="address"
          placeholder="123 Easy Street..."
          name="address"
          v-model="address"
        />
      </div>
      <div class="form-time">
        <label for="time">When is the Meetup?</label>
        <input type="time" id="time" name="time" v-model="time" />
      </div>
      <!-- FIXME: time and date in seperate variables for cleaner look -->
      <div class="form-date">
        <label for="date">On what date is the Meetup?</label>
        <input type="date" id="date" name="date" v-model="date" />
      </div>
      <button @click.prevent="registerThisMeetup">
        Register
      </button>
    </form>
  </div>
</template>
<script>
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex';
export default {
  name: 'CreateMeetupForm',
  computed: {
    ...mapFields([
      'meetupForm.eventName',
      'meetupForm.details',
      'meetupForm.time',
      'meetupForm.address',
      'meetupForm.date',
    ]),
  },
  methods: {
    ...mapActions(['registerThisMeetup']),
  },
};
</script>
