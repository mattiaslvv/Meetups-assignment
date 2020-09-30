<template>
  <v-container v-if="clickedMeetup" scrollable class="d-flex justify-center">
    <v-card width="80%" min-height="100%" class="d-flex flex-column" wrap>
      <v-img
        class="white--text"
        height="300"
        src="https://placeimg.com/600/300/any"
        width="100%"
      >
        <template v-slot:placeholder>
          <v-sheet color="grey lighten-4" class="px-3 pt-3 pb-3 fill-height">
            <v-skeleton-loader class="mx-auto" type="image"></v-skeleton-loader>
          </v-sheet>
        </template>
      </v-img>
      <v-card-title class="display-1 styled gradient space-bot">{{
        clickedMeetup.eventName
      }}</v-card-title>
      <v-card-subtitle class="pb-0 title"
        >{{ clickedMeetup.date }}, {{ clickedMeetup.time }}</v-card-subtitle
      >
      <v-spacer />
      <v-card-text class="title">
        <div>{{ clickedMeetup.host }}</div>
      </v-card-text>
      <v-card-text class="title fat">
        <div>{{ clickedMeetup.details }}</div>
      </v-card-text>
      <v-card-title>
        <div>{{ clickedMeetup.address }}</div>
      </v-card-title>
      <BaseMap
        :coords="{
          lat: clickedMeetup.location.coordinates[1],
          long: clickedMeetup.location.coordinates[0],
        }"
        :name="clickedMeetup.eventName"
      />
      <v-card-title class="title styled gradient space-top">
        Attending<v-badge
          color="orange"
          v-if="clickedMeetup.attendees.length > 0"
          :content="clickedMeetup.attendees.length"
          offset-x="1"
          offset-y="-2"
        />
        <v-spacer v-if="isAttending" />
        <v-card-title v-if="isAttending" class="grey-text"
          >You're attending</v-card-title
        >
      </v-card-title>
      <v-container class="space-bot">
        <v-row dense>
          <v-col
            v-for="attendant in clickedMeetup.attendees"
            :key="attendant._id"
            md=""
            xs4="2"
          >
            <v-card class="mx-auto">
              <v-card-text>
                <p class="title low-margin">{{ attendant }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="isLoggedIn && !isAttending">
        <v-btn
          @click="attendThisMeetup($route.params.id)"
          dark
          id="sendAttend"
          depressed
          color="orange"
          class="font-weight-bold"
        >
          Attend this Meetup
        </v-btn>
      </v-container>
      <v-container v-if="isLoggedIn && isAttending">
        <v-btn
          @click="removeAttendThisMeetup($route.params.id)"
          dark
          depressed
          id="removeAttend"
          color="orange"
          class="font-weight-bold"
        >
          I don't want to go anymore
        </v-btn>
      </v-container>
      <v-card-title class="title styled gradient">
        Reviews<v-badge
          color="orange"
          v-if="clickedMeetup.reviews.length > 0"
          :content="clickedMeetup.reviews.length"
          offset-x="1"
          offset-y="-2"
        />
        <v-spacer v-if="alreadyReviewed" />
        <v-card-title class="grey-text" v-if="alreadyReviewed"
          >You've reviewed this Meetup</v-card-title
        >
      </v-card-title>
      <v-container class="space-bot">
        <v-row dense>
          <v-col v-for="review in clickedMeetup.reviews" :key="review._id">
            <v-card class="mx-auto">
              <v-card-text>
                <p class="title low-margin">User: {{ review.username }}</p>
                <div class="subheading">Commented: {{ review.text }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="smaller" wrap v-if="isLoggedIn && !alreadyReviewed">
        <v-text-field
          type="text"
          placeholder="Thoughts?"
          color="orange"
          name="newReviewText"
          prepend-icon="mdi-comment-text-outline"
          v-model="reviewText"
          id="reviewInput"
        />
        <v-btn
          dark
          depressed
          id="sendReview"
          color="orange"
          class="font-weight-bold"
          @click="
            sendThisReview({
              _id: clickedMeetup._id,
              text: reviewText,
            })
          "
        >
          Send Review
        </v-btn>
      </v-container>
      <v-container v-if="isLoggedIn && alreadyReviewed">
        <v-btn
          @click="removeThisReview($route.params.id)"
          dark
          id="removeReview"
          depressed
          color="orange"
          class="font-weight-bold"
        >
          Remove review
        </v-btn>
      </v-container>
    </v-card>
  </v-container>
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
      'loading',
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
.styled {
  width: 100%;
  /* background: #ff9800; */
  margin-bottom: 2%;
  text-align: center;
  color: #ffffff;
}
.gradient {
  background: #485563; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #29323c,
    #485563
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #29323c,
    #485563
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.card {
  border: 1px solid black;
  margin: 0 auto;
}
.placeholder {
  margin: 15px;
}
.smaller {
  width: 50%;
}
.fat {
  min-height: 150px;
}
.low-margin {
  margin-bottom: 0;
}
.space-bot {
  margin-bottom: 5%;
}
.space-top {
  margin-top: 5%;
}
.grey-text {
  color: rgba(255, 255, 255, 0.753);
}
</style>
