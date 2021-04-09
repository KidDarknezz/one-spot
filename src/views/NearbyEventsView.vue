<template>
  <q-page>
    <div class="row q-pa-sm">
      <q-space />
      <q-btn
        icon="filter_list"
        flat
        color="pink"
        round
        @click="filterDialog = true"
      />
    </div>
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
          <div class="text-subtitle2 os-semibold">
            {{ event.name }}
          </div>
          <div class="text-caption text-grey-7">{{ event.subtitle }}</div>
          <div class="text-caption text-grey-7">{{ event.ownerName }}</div>
        </div>
      </div>
    </div>
    <q-dialog v-model="filterDialog">
      <q-card flat style="min-width: 320px" class="os-rounded-border">
        <q-card-section>
          <div class="text-h6 os-semibold">Filtros</div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle2 os-semibold q-mb-sm">
            Rango de busqueda (km)
          </div>
          <q-slider
            v-model="filterRange"
            :step="1"
            color="pink"
            :min="1"
            :max="5"
            label
            class="q-mb-md"
            markers
          />
          <q-select
            label="Categorias"
            :options="[1, 2, 3]"
            filled
            color="pink"
            v-model="selectedCategory"
          />
        </q-card-section>
        <q-card-actions>
          <q-space />
          <q-btn
            label="Aceptar"
            no-caps
            flat
            rounded
            color="pink"
            class="os-font os-semibold"
            @click="
              filterDialog = false;
              updateSearchRadius(filterRange);
              getGeoEvents(userLocation);
              selectedEvent = null;
              mapCenter = userLocation;
            "
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      filterDialog: false,
      filterRange: 1,
      selectedCategory: "",
    };
  },
  computed: {
    ...mapState("homeStore", ["nearByEvents"]),
  },
  methods: {
    ...mapActions("homeStore", [
      "getUserLocation",
      "getGeoEvents",
      "updateSearchRadius",
    ]),

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
