<template>
  <q-page>
    <div v-if="selectedEvent">
      <!-- EVEMT FLYER -->
      <div style="height: 60vh">
        <q-img
          :src="selectedEvent.assets.cover"
          class="text-white text-bold fixed-top"
          id="eventCover"
        >
          <div class="row full-width">
            <div class="col-xs-1">
              <q-btn icon="arrow_back" flat round @click="$router.go(-1)" />
            </div>
            <q-space />
            <div class="col-xs-1">
              <q-btn icon="o_notifications" flat round />
            </div>
          </div>
        </q-img>
      </div>
      <!-- /EVENT FLYER -->

      <!-- EVENT DETAILS -->
      <q-card class="q-pa-md bg-grey-2 os-event-details">
        <q-card-section>
          <div class="text-h6">
            {{ selectedEvent.name }}
          </div>
          <div class="text-subtitle">DJ NAME - DJ NAME</div>
          <div class="text-caption">24 de Enero 2022</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div>
            <q-icon name="o_sell" class="on-left" />
            <span class="text-caption">Music - Food & Drink - Nightlife</span>
          </div>
          <div>
            <q-icon name="o_schedule" class="on-left" />
            <span class="text-caption">9:30 p.m. - 2:00 a.m.</span>
          </div>
          <div>
            <q-icon name="o_location_on" class="on-left" />
            <span class="text-caption">14 km</span>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec neque
            ante, pharetra vitae risus nec, cursus laoreet purus. Etiam quis
            faucibus turpis, ut aliquet sem.
          </div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle2 q-mb-md">Ubicacion</div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.352027880072!2d-79.54883558464874!3d8.939671992841747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8facaf4505d55e77%3A0xc49a64e5f3480699!2sFigali%20Convention%20Center!5e0!3m2!1sen!2spa!4v1612989672755!5m2!1sen!2spa"
            width="100%"
            height="300"
            frameborder="0"
            style="border: 0"
            allowfullscreen=""
            aria-hidden="false"
            tabindex="0"
          ></iframe>
        </q-card-section>
        <q-card-actions>
          <q-btn
            label="Guardar"
            class="full-width"
            no-caps
            color="accent"
            push
          />
        </q-card-actions>
      </q-card>
      <!-- /EVENT DETAILS -->
    </div>
    <loading-overlay :display="showLoading" />
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("eventStore", ["getSelectedEvent", "emptySelectedEvent"]),
  },
  computed: {
    ...mapState("eventStore", ["selectedEvent"]),

    showLoading() {
      if (this.selectedEvent) return false;
      else return true;
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    this.getSelectedEvent(this.$route.params.eventId);
  },
  beforeDestroy() {
    this.emptySelectedEvent();
  },
};
</script>

<style>
.os-event-details {
  border-top-left-radius: 15px !important;
  border-top-right-radius: 15px !important;
}
</style>
