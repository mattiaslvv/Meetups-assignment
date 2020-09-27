<template>
  <v-col xs12 md6>
    <v-card class="mx-auto" width="450">
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://placeimg.com/600/300/any"
      >
        <template v-slot:placeholder>
          <v-sheet color="grey lighten-4" class="px-3 pt-3 pb-3 fill-height">
            <v-skeleton-loader class="mx-auto" type="image"></v-skeleton-loader>
          </v-sheet>
        </template>
        <v-card-title id="bground-blur">{{ meetup.eventName }}</v-card-title>
      </v-img>
      <v-card-subtitle class="pb-0">{{ meetup.date }}</v-card-subtitle>
      <v-card-text class="text--primary">
        <div>Host: {{ meetup.host }}</div>
        <div>Where: {{ meetup.address }}</div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="orange"
          class="font-weight-bold"
          text
          @click="viewFullMeetup(meetup._id)"
        >
          View full Meetup
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'Meetup',
  data() {
    return {
      reviewText: '',
      show: false,
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
#bground-blur {
  background: rgba(0, 0, 0, 0.404);
}
.mx-auto {
  margin-bottom: 10%;
}
</style>
