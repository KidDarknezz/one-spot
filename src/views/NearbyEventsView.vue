<template>
  <q-page>
    <GmapMap
      v-if="userLocation"
      :center="mapCenter"
      :zoom="13"
      style="width: 100%; height: 600px"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in nearByEvents"
        :position="m.coords"
        :clickable="true"
        @click="
          mapCenter = m.coords;
          selectEvent(index);
        "
      >
      </GmapMarker>
    </GmapMap>
    <div class="q-pa-lg" v-if="selectedEvent != null">
      <q-card class="os-rounded-border">
        <q-card-section>
          {{ nearByEvents[selectedEvent].name }}
        </q-card-section>
      </q-card>
    </div>
    <div class="q-pa-lg">
      <div class="row q-py-sm" v-for="(event, i) in nearByEvents" :key="i">
        <div class="col-xs-2">
          img
        </div>
        <div class="col">
          <div class="text-subtitle2 os-semibold">{{ event.name }}</div>
          <div class="text-caption text-grey-7">{{ event.subtitle }}</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      userLocation: null,
      mapCenter: null,
      selectedEvent: null,
    };
  },
  computed: {
    ...mapState("homeStore", ["nearByEvents"]),
  },
  methods: {
    ...mapActions("homeStore", ["getUserLocation", "getGeoEvents"]),

    selectEvent(index) {
      this.selectedEvent = index;
    },
  },
  mounted() {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          this.userLocation = {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          };
          this.mapCenter = this.userLocation;
          this.getGeoEvents(this.userLocation);
        },
        (err) => console.log(err)
      );
    }
  },
};
</script>
