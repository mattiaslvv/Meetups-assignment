<template>
  <v-container class="fill-height" fluid v-if="user">
    <v-card class="mx-auto" max-width="800" min-height="100%" tile>
      <v-img
        max-height="300"
        src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
      >
        <template v-slot:placeholder>
          <v-sheet color="grey lighten-4" class="px-3 pt-3 pb-3 fill-height">
            <v-skeleton-loader class="mx-auto" type="image"></v-skeleton-loader>
          </v-sheet>
        </template>
      </v-img>
      <v-col>
        <v-avatar size="150" class="avatar-position">
          <v-img
            src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
          ></v-img>
        </v-avatar>
      </v-col>
      <v-list-item class="margin-top" color="rgba(0, 0, 0, .4)">
        <v-list-item-content>
          <v-list-item-title class="display-1">{{
            user.name
          }}</v-list-item-title>
          <v-list-item-subtitle class="title">{{
            user.email
          }}</v-list-item-subtitle>
          <v-list-item-subtitle class="title">{{
            user.username
          }}</v-list-item-subtitle>
          <v-list-item-subtitle class="title"
            >Member since: {{ user.date }}</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
      <v-container
        v-if="user.createdMeetups != ''"
        class="full"
        data-test="createdMeetups"
      >
        <v-card-title
          >My created Meetups
          <v-badge
            color="orange"
            v-if="user.createdMeetups"
            :content="user.createdMeetups.length"
            offset-x="1"
            offset-y="-2"
          />
        </v-card-title>
        <v-row>
          <v-col
            md="4"
            xs="8"
            v-for="meetup in user.createdMeetups"
            :key="meetup._id"
          >
            <v-card
              class="mx-auto d-flex flex-column align-center"
              min-width="200"
              min-height="50"
            >
              <v-card-title
                class="clickable"
                @click="viewFullMeetup(meetup._id)"
                >{{ meetup.eventName }}</v-card-title
              >
              <v-btn
                dark
                width="100%"
                color="orange"
                id="removeMeetup"
                @click="removeThisMeetup(meetup._id)"
              >
                Remove Meetup
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-container
        v-if="user.attendingMeetups != ''"
        data-test="attendingMeetups"
      >
        <v-card-title
          >Meetups I'm attending
          <v-badge
            color="orange"
            v-if="user.attendingMeetups"
            :content="user.attendingMeetups.length"
            offset-x="1"
            offset-y="-2"
          />
        </v-card-title>
        <v-row>
          <v-col
            md="4"
            xs="8"
            v-for="attendingMeetup in user.attendingMeetups"
            :key="attendingMeetup.length"
          >
            <v-card
              class="mx-auto d-flex flex-column align-center"
              min-width="200"
              min-height="50"
            >
              <v-card-title
                class="clickable"
                @click="viewFullMeetup(attendingMeetup._id)"
                >{{ attendingMeetup.meetupName }}</v-card-title
              >
              <v-btn
                dark
                width="100%"
                color="orange"
                id="removeAttendance"
                @click="removeAttendThisMeetup(attendingMeetup._id)"
              >
                Remove attendance
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="user.reviewHistory != ''" data-test="reviewHistory">
        <v-card-title
          >Meetups I've reviewed
          <v-badge
            color="orange"
            v-if="user.reviewHistory"
            :content="user.reviewHistory.length"
            offset-x="1"
            offset-y="-2"
          />
        </v-card-title>
        <v-row>
          <v-col
            md="4"
            xs="8"
            v-for="review in user.reviewHistory"
            :key="review.meetupName"
          >
            <v-card
              class="mx-auto d-flex flex-column align-center"
              min-width="200"
              min-height="50"
            >
              <v-card-title
                class="clickable"
                @click="viewFullMeetup(review._id)"
                >{{ review.meetupName }}</v-card-title
              >
              <v-card-subtitle>
                {{ review.review }}
              </v-card-subtitle>
              <v-btn
                dark
                width="100%"
                color="orange"
                id="removeReview"
                @click="removeThisReview(review._id)"
              >
                Remove review
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
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
      'removeThisMeetup',
    ]),
  },
  created() {
    this.getProfile();
  },
};
</script>
<style scoped>
.clickable {
  cursor: pointer;
}
.avatar-position {
  position: absolute;
  top: 200px;
}
.margin-top {
  margin-top: 8%;
}
.full {
  width: 100%;
}
</style>
