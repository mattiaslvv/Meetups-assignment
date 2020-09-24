<template>
  <div id="mapContainer" class="basemap"></div>
</template>
<script>
import mapboxgl from 'mapbox-gl';
export default {
  name: 'BaseMap',
  data() {
    return {
      accessToken: process.env.VUE_APP_MAPBOX_API_KEY,
    };
  },
  props: {
    coords: {
      lat: Number,
      long: Number,
    },
    name: String,
  },
  mounted() {
    let coords = [this.coords.long, this.coords.lat];
    mapboxgl.accessToken = this.accessToken;
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
  border: 1px solid black;
  width: 60%;
  height: 300px;
  margin: 0 auto;
}
</style>
