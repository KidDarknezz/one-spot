<template>
  <q-page>
    <div style="height: 400px;">
      <GmapMap
        v-if="userLocation"
        :center="mapCenter"
        :zoom="12"
        style="width: 100%; height: 400px"
        class="absolute-top"
      >
        <GmapMarker :position="userLocation"> </GmapMarker>
        <div :key="index" v-for="(m, index) in nearByEvents">
          <GmapMarker
            :position="m.coords"
            :clickable="true"
            @click="
              mapCenter = m.coords;
              selectEvent(index);
            "
            :icon="{ url: require('@/assets/MapMarker.png') }"
            v-if="
              !selectedCategory ||
                m.selectedCategories.includes(selectedCategory)
            "
          >
          </GmapMarker>
        </div>
      </GmapMap>
    </div>

    <div class="row q-px-lg q-py-md">
      <div>
        <div class="text-caption os-semibold on-left">
          Distancia: <span class="text-pink">{{ filterRange }}</span> km
        </div>
        <div class="text-caption os-semibold">
          Categoria:
          <span class="text-pink">{{
            selectedCategory ? selectedCategory : "-"
          }}</span>
        </div>
      </div>

      <q-space />
      <q-btn
        icon="filter_list"
        flat
        color="pink"
        round
        @click="filterDialog = true"
      />
    </div>
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
      <div
        class="row q-py-sm"
        v-for="(event, i) in nearByEvents"
        :key="i"
        v-show="
          event.selectedCategories.includes(selectedCategory) ||
            !selectedCategory
        "
      >
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
          <div class="text-caption text-grey-7">
            {{ event.selectedCategories }}
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="filterDialog">
      <q-card flat style="min-width: 320px" class="os-rounded-border">
        <q-card-section>
          <div class="text-h6 os-semibold">Filtros</div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle2 os-semibold q-mb-sm os-font">
            Rango de busqueda
            <span class="text-pink">{{ filterRange }}</span> km
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
            :options="categories"
            filled
            color="pink"
            v-model="selectedCategory"
            emit-value
            map-options
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
            @click="applyFilter()"
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
      filterRange: 2,
      selectedCategory: "",
      categories: [
        { label: "Todas", value: "" },
        { label: "Musica", value: "music" },
        { label: "Fiestas", value: "party" },
        { label: "Deportes", value: "sports" },
        { label: "Cultura", value: "culture" },
        { label: "Teatro", value: "theatre" },
        { label: "Conciertos", value: "concerts" },
        { label: "Ferias", value: "carnivals" },
        { label: "Aire Libre", value: "open-air" },
        { label: "Familia", value: "family" },
        { label: "Arte", value: "art" },
        { label: "Turismo", value: "tourism" },
        { label: "Discotecas", value: "clubs" },
        { label: "Bares", value: "bars" },
        { label: "Nightlife", value: "nightlife" },
        { label: "Festivales", value: "festivals" },
        { label: "Motivacional", value: "motivational" },
        { label: "Conferencias", value: "conferences" },
        { label: "Seminarios", value: "seminars" },
        { label: "Networking", value: "networking" },
        { label: "Expos", value: "expos" },
        { label: "Galas", value: "galas" },
        { label: "Gaming", value: "gaming" },
        { label: "Trending", value: "trending" },
      ],
    };
  },
  computed: {
    ...mapState("homeStore", ["nearByEvents", "searchRadius"]),
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
    applyFilter() {
      this.filterDialog = false;
      this.updateSearchRadius(this.filterRange);
      this.getGeoEvents(this.userLocation);
      this.selectedEvent = null;
      this.mapCenter = this.userLocation;
    },
  },
  mounted() {
    this.filterRange = this.searchRadius;
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
