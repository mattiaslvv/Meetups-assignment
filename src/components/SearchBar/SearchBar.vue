<template>
  <v-row>
    <v-col cols="12" sm="5" md="3" offset-md="7">
      <v-container>
        <v-text-field
          color="orange"
          id="input"
          prepend="magnify"
          type="text"
          @keyup="getByThisKeyword($event.target.value)"
          label="Search..."
          clearable
          @click:clear="displayAllMeetups"
        ></v-text-field>
      </v-container>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'SearchBar',
  methods: {
    ...mapActions(['getByThisKeyword', 'displayAllMeetups']),
  },
};
</script>
<style lang="scss" scoped></style>
