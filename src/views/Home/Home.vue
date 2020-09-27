<template>
  <v-container class="home">
    <SearchBar />
    <MeetupList />
  </v-container>
</template>

<script>
import MeetupList from '@/components/MeetupList/MeetupList.vue';
import SearchBar from '@/components/SearchBar/SearchBar.vue';
export default {
  name: 'Home',
  components: {
    MeetupList,
    SearchBar,
  },
};
</script>
