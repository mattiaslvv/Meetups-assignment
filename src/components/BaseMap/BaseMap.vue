<template>
  <v-container id="mapContainer" class="basemap"> </v-container>
</template>
<script>
import mapboxgl from 'mapbox-gl';
import { mapGetters } from 'vuex';
export default {
  name: 'BaseMap',
  props: {
    coords: {
      lat: Number,
      long: Number,
    },
    name: String,
  },
  computed: {
    ...mapGetters(['getMapboxToken']),
  },
  mounted() {
    let coords = [this.coords.long, this.coords.lat];
    mapboxgl.accessToken = this.getMapboxToken;
    const map = new mapboxgl.Map({
      container: 'mapContainer',
      style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
      center: coords,
      zoom: 12,
    });
    const marker = new mapboxgl.Marker();
    marker.setLngLat(coords);
    marker.addTo(map);
    marker.setPopup(new mapboxgl.Popup().setHTML(`<h2>${this.name}</h2>`));
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
#mapContainer {
  width: 100%;
  height: 200px;
  margin: 0 auto;
  margin-bottom: 6%;
  border: none;
  outline: none;
  /* #ff9800; */
  -webkit-box-shadow: 0px 11px 10px -7px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 11px 10px -7px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 11px 10px -7px rgba(0, 0, 0, 0.2);
}
</style>
