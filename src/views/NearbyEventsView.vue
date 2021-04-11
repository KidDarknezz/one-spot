<template>
  <q-page>
    <GmapMap
      v-if="userLocation"
      :center="mapCenter"
      :zoom="12.6"
      style="width: 100%; height: 60vh"
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
          v-if="filterEvent(m)"
        >
        </GmapMarker>
      </div>
    </GmapMap>
    <div class="row q-px-lg q-py-md bg-grey-2 q-mb-md">
      <div class="col">
        <div class="text-caption os-semibold on-left">
          Distancia: <span class="text-pink">{{ filterRange }}</span> km
        </div>
        <div class="text-caption os-semibold">
          Fecha:
          <span class="text-pink">{{ filterDate ? filterDate : "-" }}</span>
        </div>
        <div class="text-caption os-semibold">
          Categoria:
          <span class="text-pink">{{
            selectedCategory ? categoryName(selectedCategory) : "-"
          }}</span>
        </div>
      </div>
      <div class="flex flex-center">
        <q-btn
          label="Limpiar filtros"
          flat
          color="grey-7"
          rounded
          size="sm"
          class="on-left"
          icon="clear_all"
          @click="clearFilter()"
        />
        <q-btn
          icon="filter_list"
          flat
          color="pink"
          round
          size="sm"
          @click="filterDialog = true"
        />
      </div>
    </div>
    <div class="q-px-lg q-mb-md" v-if="selectedEvent != null">
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
    <div class="q-px-lg q-mb-lg">
      <div
        class="row q-py-sm"
        v-for="(event, i) in nearByEvents"
        :key="i"
        v-show="filterEvent(event)"
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
            class="q-mb-md"
          />
          <q-input
            filled
            v-model="filterDate"
            mask="date"
            :rules="['date']"
            color="pink"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="filterDate" color="pink">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions>
          <q-space />
          <q-btn
            label="Cancelar"
            no-caps
            flat
            rounded
            class="os-font os-semibold"
            v-close-popup
          />
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
import returnCategoryName from "@/mixins/returnCategoryName";

export default {
  data() {
    return {
      userLocation: null,
      mapCenter: null,
      selectedEvent: null,
      filterDialog: false,
      filterRange: 2,
      selectedCategory: "",
      filterDate: this.returnTodayDate(),
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
    clearFilter() {
      this.selectedCategory = "";
      this.filterDate = "";
      this.mapCenter = this.userLocation;
      this.selectedEvent = null;
    },
    filterEvent(event) {
      if (
        (event.selectedCategories.includes(this.selectedCategory) ||
          !this.selectedCategory) &&
        this.returnShouldDisplayByDate(event.dateAndTime)
      )
        return true;
      else return false;
    },
    returnShouldDisplayByDate(dates) {
      if (!this.filterDate) return true;
      for (let i of dates) {
        if (i.startDate == this.filterDate) return true;
      }
    },
    returnTodayDate() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = `${yyyy}/${mm}/${dd}`;
      return today;
    },
  },
  mixins: [returnCategoryName],
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
