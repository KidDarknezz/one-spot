<template>
  <q-page class="q-pa-lg">
    <div class="row q-mb-xl">
      <div class="text-h5 os-semibold">
        Mis Eventos Proximos ({{ myEvents.length }})
      </div>
      <q-space />
      <q-btn
        label="Nuevo evento"
        no-caps
        rounded
        icon-right="event"
        color="black"
        unelevated
        class="os-semibold"
        @click="newEventDialog = true"
      />
    </div>

    <div class="row q-mb-lg">
      <div
        class="col-lg-2 col-xs-12"
        v-for="(openEvent, i) in myEvents"
        :key="i"
      >
        <div class="row">
          <div class="col-lg-4 col-xs-3 q-mb-lg">
            <img
              :alt="
                returnEventAsset(openEvent.owner, openEvent.flyer, openEvent.id)
              "
              :id="openEvent.id"
              width="100%"
              class="os-rounded-border"
              style="cursor: pointer"
              @click="$router.push(`/review-my-event/${openEvent.id}`)"
            />
          </div>
          <div class="col-lg-8 q-pl-sm">
            <div
              :class="
                `text-caption os-semibold text-${
                  returnStatusNameAndColor(openEvent.status).color
                }`
              "
            >
              {{ returnStatusNameAndColor(openEvent.status).status }}
            </div>
            <div class="text-subtitle2 os-semibold">
              {{ openEvent.name }}
            </div>
            <div class="text-caption text-grey-9">
              {{ openEvent.subtitle }}
            </div>
            <div class="text-caption text-grey-6">
              {{ openEvent.dateAndTime[0].startDate }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-h5 os-semibold q-mb-xl">Eventos Pasados (8)</div>
    <div class="row q-mb-lg">
      <div class="col-lg-2 col-xs-12" v-for="(openEvent, i) in 8" :key="i">
        <div class="row">
          <div class="col-lg-4 col-xs-3 q-mb-lg">
            <img
              src="@/assets/event_4_thumbnail.webp"
              width="100%"
              class="os-rounded-border"
            />
          </div>
          <div class="col-lg-8 q-pl-sm">
            <div class="text-subtitle2 os-semibold">Event Title</div>
            <div class="text-caption text-grey-9">
              Event Sub-Title
            </div>
            <div class="text-caption text-grey-6">24 de enero 2022</div>
          </div>
        </div>
      </div>
    </div>
    <q-dialog
      v-model="newEventDialog"
      maximized
      transition-hide="slide-down"
      transition-show="slide-up"
    >
      <q-card>
        <div class="row">
          <q-space />
          <div class="col-lg-5">
            <q-card-actions>
              <q-space />
              <q-btn
                icon="close"
                flat
                round
                color="black"
                @click="newEventDialog = false"
              />
            </q-card-actions>
            <q-card-section>
              <NewEventFormComponent
                @closeNewEventDialog="newEventDialog = false"
              />
            </q-card-section>
          </div>
          <q-space />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import firebase from "firebase/app";
import "firebase/storage";

import { mapState, mapActions } from "vuex";
import NewEventFormComponent from "@/components/NewEventFormComponent";

export default {
  data() {
    return {
      newEventDialog: false,
    };
  },
  methods: {
    ...mapActions("dashboardStore", ["getMyEvents", "getGeoEvents"]),

    returnStatusNameAndColor(status) {
      switch (status) {
        case "review":
          return { status: "En revision", color: "amber" };
        case "public":
          return { status: "Publico", color: "green" };
        case "ended":
          return { status: "Terminado", color: "grey-7" };
        case "rejected":
          return { status: "Rechazado", color: "red-7" };
      }
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
  },
  computed: {
    ...mapState("dashboardStore", ["myEvents"]),
  },
  mounted() {
    if (this.myEvents.length <= 0) this.getMyEvents();
  },
  components: {
    NewEventFormComponent,
  },
};
</script>
