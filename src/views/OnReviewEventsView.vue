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
          <img :src="event.flyer" />
          <q-card-section>
            <div class="text-subtitle2 os-semibold">{{ event.name }}</div>
            <div class="text-caption">{{ event.ownerName }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions("dashboardStore", ["getOnReviewEvents", "getGeoEvents"]),
  },
  computed: {
    ...mapState("dashboardStore", ["onReviewEvents"]),
  },

  mounted() {
    this.getOnReviewEvents();
  },
};
</script>
