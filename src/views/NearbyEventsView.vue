<template>
  <q-page>
    <GmapMap
      v-if="userLocation"
      :center="mapCenter"
      :zoom="12"
      style="width: 100%; height: 400px"
    >
      <GmapMarker :position="userLocation"> </GmapMarker>
      <GmapMarker
        :key="index"
        v-for="(m, index) in nearByEvents"
        :position="m.coords"
        :clickable="true"
        @click="
          mapCenter = m.coords;
          selectEvent(index);
        "
        :icon="{ url: require('@/assets/MapMarker.png') }"
      >
      </GmapMarker>
    </GmapMap>
    <div class="q-pa-lg" v-if="selectedEvent != null">
      <q-card class="os-rounded-border">
        <q-card-section>
          <div class="row">
            <div class="col-xs-2 q-pr-sm">
              <img
                :src="
                  returnEventAsset(
                    nearByEvents[selectedEvent].owner,
                    nearByEvents[selectedEvent].flyer,
                    `${nearByEvents[selectedEvent].id}_s`
                  )
                "
                :id="`${nearByEvents[selectedEvent].id}_s`"
                width="100%"
                class=""
              />
            </div>
            <div class="col-xs-7">
              <div class="text-subtitle2 os-semibold">
                {{ nearByEvents[selectedEvent].name }}
              </div>
              <div class="text-caption text-grey-7">
                {{ nearByEvents[selectedEvent].ownerName }}
              </div>
            </div>
            <div class="col">
              <div class="text-caption os-semibold text-grey-7 text-right">
                {{ calculateDistance(nearByEvents[selectedEvent].coords) }} km
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="q-pa-lg">
      <div class="row q-py-sm" v-for="(event, i) in nearByEvents" :key="i">
        <div class="col-xs-2 q-pr-sm">
          <img
            :src="returnEventAsset(event.owner, event.flyer, event.id)"
            :id="event.id"
            width="100%"
            class=""
          />
        </div>
        <div class="col">
          <div class="text-subtitle2 os-semibold">{{ event.name }}</div>
          <div class="text-caption text-grey-7">{{ event.subtitle }}</div>
          <div class="text-caption text-grey-7">{{ event.ownerName }}</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import firebase from "firebase/app";
import "firebase/storage";
import { mapState, mapActions } from "vuex";
import {
  geohashForLocation,
  geohashQueryBounds,
  distanceBetween,
} from "geofire-common";

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
    returnEventAsset(owner, ref, id) {
      firebase
        .storage()
        .ref()
        .child(`events-assets/${owner}/${ref}`)
        .getDownloadURL()
        .then((url) => {
          document.getElementById(id).setAttribute("src", url);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    calculateDistance(coords) {
      let distance = distanceBetween(
        [coords.lat, coords.lng],
        [this.userLocation.lat, this.userLocation.lng]
      );
      return distance.toFixed(2);
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
