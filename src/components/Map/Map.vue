<template>
  <div>Lat: {{ coords.lat }} , Long: {{ coords.long }}</div>
  <!-- FIXME: add MAPBOX api for a map with there coords, with GeoJson maybe?-->
</template>
<script>
export default {
  name: 'Map',
  props: {
    coords: {
      lat: Number,
      long: Number,
    },
  },
};
</script>
<style scoped></style>
