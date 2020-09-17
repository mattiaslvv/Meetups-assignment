<template>
  <div>
    <Meetup v-for="meetup in getMeetups" :key="meetup._id" :meetup="meetup" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Meetup from '@/components/Meetup/Meetup.vue';
export default {
  name: 'MeetupList',
  components: {
    Meetup,
  },
  computed: {
    ...mapGetters(['getMeetups']),
  },
  methods: {
    ...mapActions(['getAllMeetups']),
  },
  created() {
    this.getAllMeetups();
  },
};
</script>
