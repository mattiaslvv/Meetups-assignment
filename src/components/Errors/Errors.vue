<template>
  <div>
    <div class="text-center ma-2">
      <v-snackbar
        content-class="font-weight-bold"
        color="red"
        :centered="centered"
        v-model="snackbar"
        id="errorMsg"
      >
        <v-icon>mdi-alert</v-icon>
        {{ msg }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            text
            class="font-weight-bold"
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Errors',
  data() {
    return {
      snackbar: true,
      centered: true,
    };
  },
  props: ['msg'],
};
</script>
<style scoped></style>
