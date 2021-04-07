<template>
  <q-page class="q-pa-lg">
    <div class="row q-mb-xl">
      <div class="text-h5 os-semibold">
        Eventos en Revision ({{ onReviewEvents.length }})
      </div>
      <q-space />
      <q-btn
        label="Ver Todos"
        no-caps
        rounded
        icon-right="event"
        color="black"
        unelevated
        class="os-semibold"
      />
    </div>
    <div class="row">
      <div
        class="col-lg-2 q-pa-sm"
        v-for="event in onReviewEvents"
        :key="event.id"
      >
        <q-card
          flat
          class="bg-grey-2"
          @click="$router.push(`/review-events/${event.id}`)"
          style="cursor: pointer"
        >
          <img
            :alt="returnEventAsset(event.owner, event.flyer, event.id)"
            :id="event.id"
          />
          <q-card-section>
            <div class="text-subtitle2 os-semibold">{{ event.name }}</div>
            <div class="text-caption">{{ event.ownerName }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-px-lg q-mt-xl">
      <GmapMap
        :center="{
          lat: 8.9834698,
          lng: -79.5170736,
        }"
        :zoom="17"
        map-type-id="roadmap"
        style="width: 100%; height: 400px"
      >
        <!-- <GmapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center = m.position"
          /> -->
        <!-- <GmapMarker :position="selectedEvent.coords" /> -->
      </GmapMap>
    </div>
  </q-page>
</template>

<script>
import firebase from "firebase/app";
import "firebase/storage";

import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions("dashboardStore", ["getOnReviewEvents", "getGeoEvents"]),

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
  },
  computed: {
    ...mapState("dashboardStore", ["onReviewEvents"]),
  },

  mounted() {
    this.getOnReviewEvents();
    this.getGeoEvents();
  },
};
</script>
