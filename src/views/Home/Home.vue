<template>
  <div class="home">
    <MeetupList />
  </div>
</template>

<script>
import MeetupList from '@/components/MeetupList/MeetupList.vue';
export default {
  name: 'Home',
  components: {
    MeetupList,
  },
};
</script>
