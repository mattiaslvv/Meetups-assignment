<template>
  <div class="home">
    <SearchBar />
    <MeetupList />
  </div>
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
