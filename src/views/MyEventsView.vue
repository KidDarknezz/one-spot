<template>
  <q-page class="q-pa-lg">
    <div class="row q-mb-xl">
      <div class="text-h5 os-semibold">
        Mis Eventos en Revision ({{ returnOnReviewEvents.length }})
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
        v-for="(pendingEvent, i) in returnOnReviewEvents"
        :key="i"
      >
        <div
          class="row"
          style="cursor: pointer"
          @click="$router.push(`/review-my-event/${pendingEvent.id}`)"
        >
          <div class="col-lg-4 col-xs-3 q-mb-lg">
            <img
              :src="pendingEvent.flyer"
              :id="pendingEvent.id"
              width="100%"
              class="os-rounded-border"
            />
          </div>
          <div class="col-lg-8 q-pl-sm">
            <div
              :class="
                `text-caption os-semibold text-${
                  returnStatusNameAndColor(pendingEvent.status).color
                }`
              "
            >
              {{ returnStatusNameAndColor(pendingEvent.status).status }}
            </div>
            <div class="text-subtitle2 os-semibold">
              {{ pendingEvent.name }}
            </div>
            <div class="text-caption text-grey-9">
              {{ pendingEvent.subtitle }}
            </div>
            <div class="text-caption text-grey-6">
              {{ pendingEvent.dateAndTime[0].startDate }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row q-mb-xl">
      <div class="text-h5 os-semibold">
        Mis Eventos Activos ({{ returnPublicEvents.length }})
      </div>
    </div>
    <div class="row q-mb-lg">
      <div
        class="col-lg-2 col-xs-12"
        v-for="(openEvent, i) in returnPublicEvents"
        :key="i"
      >
        <div
          class="row"
          style="cursor: pointer"
          @click="$router.push(`/review-my-event/${openEvent.id}`)"
        >
          <div class="col-lg-4 col-xs-3 q-mb-lg">
            <img
              :src="openEvent.flyer"
              :id="openEvent.id"
              width="100%"
              class="os-rounded-border"
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
    <div class="text-h5 os-semibold q-mb-xl">
      Mis Eventos Culminados o Rechazados ({{ returnClosedEvents.length }})
    </div>
    <div class="row q-mb-lg">
      <div
        class="col-lg-2 col-xs-12"
        v-for="(closedEvent, i) in returnClosedEvents"
        :key="i"
      >
        <div
          class="row"
          style="cursor: pointer"
          @click="$router.push(`/review-my-event/${closedEvent.id}`)"
        >
          <div class="col-lg-4 col-xs-3 q-mb-lg">
            <img
              :src="closedEvent.flyer"
              :id="closedEvent.id"
              width="100%"
              class="os-rounded-border"
            />
          </div>
          <div class="col-lg-8 q-pl-sm">
            <div
              :class="
                `text-caption os-semibold text-${
                  returnStatusNameAndColor(closedEvent.status).color
                }`
              "
            >
              {{ returnStatusNameAndColor(closedEvent.status).status }}
            </div>
            <div class="text-subtitle2 os-semibold">
              {{ closedEvent.name }}
            </div>
            <div class="text-caption text-grey-9">
              {{ closedEvent.subtitle }}
            </div>
            <div class="text-caption text-grey-6">
              {{ closedEvent.dateAndTime[0].startDate }}
            </div>
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
          <div class="col-lg-9">
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
  },
  computed: {
    ...mapState("dashboardStore", ["myEvents"]),

    returnPublicEvents() {
      let publicEvents = [];
      this.myEvents.forEach((event) => {
        if (event.status == "public") publicEvents.push(event);
      });
      return publicEvents;
    },
    returnOnReviewEvents() {
      let onReviewEvents = [];
      this.myEvents.forEach((event) => {
        if (event.status == "review") onReviewEvents.push(event);
      });
      return onReviewEvents;
    },
    returnClosedEvents() {
      let closedEvents = [];
      this.myEvents.forEach((event) => {
        if (event.status == "rejected" || event.status == "ended")
          closedEvents.push(event);
      });
      return closedEvents;
    },
  },
  mounted() {
    if (this.myEvents.length <= 0) this.getMyEvents();
  },
  components: {
    NewEventFormComponent,
  },
};
</script>
