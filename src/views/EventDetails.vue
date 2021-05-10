<template>
  <q-page>
    <div v-if="selectedEvent">
      <!-- EVEMT FLYER -->
      <div style="height: 60vh">
        <q-img
          :src="require(`@/assets/4_5_flyer.webp`)"
          class="text-white text-bold fixed-top"
          style="width: 100%"
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
      <q-card class="bg-white os-event-details">
        <q-card-section>
          <q-separator
            style="height: 5px; width: 50px; margin: 0 auto; border-radius: 2px;"
          />
        </q-card-section>
        <q-card-section>
          <div class="row q-mb-md">
            <div class="col-xs-9">
              <div class="text-h6 os-bold text-os-grey-dark">
                Music Party International World
              </div>
              <div class="text-caption text-os-grey-dark">
                Event subtitle
              </div>
            </div>
            <q-space />
            <div class="col-xs-3">
              <q-btn
                round
                icon="favorite_border"
                flat
                size="sm"
                color="os-grey-dark"
                class="q-ml-xs float-right"
              />
              <q-btn
                round
                icon="o_share"
                flat
                size="sm"
                color="os-grey-dark"
                class="q-mr-xs float-right"
              />
            </div>
          </div>
          <div class="row">
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar.png" />
            </q-avatar>
            <div
              class="text-caption os-bold text-os-grey-dark flex flex-center on-right"
            >
              Event organizer
            </div>
            <q-space />
            <div class="flex flex-center">
              <q-btn
                label="Follow"
                no-caps
                color="os-pink"
                push
                unelevated
                size="sm"
                class="os-bold q-px-md"
              />
            </div>
          </div>
        </q-card-section>
        <q-separator class="q-mx-lg" color="os-grey-dark" />
        <q-card-section>
          <div class="text-caption">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut brie
            brie bibendum laoreet mi vel sollicitudin. Vestibulum scelerisque de
            ccosa si no commodo leo sit amet rutrum. Suspendisse finibus sem a
            augue dictum condimentum.
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row">
            <div class="col-xs-4 q-pa-xs" v-for="(tag, i) in 4" :key="i">
              <div
                class="bg-grey-3 q-py-sm q-px-md os-rounded-border  text-caption os-semibold text-os-grey-dark text-center"
              >
                Musica
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div>
            <q-icon name="calendar_today" class="on-left" />
            <span class="text-caption">Sábado, 24 de enero</span>
          </div>
          <div>
            <q-icon name="watch_later" class="on-left" />
            <span class="text-caption">9:30 p.m. - 2:00 a.m.</span>
          </div>
          <div>
            <q-icon name="paid" class="on-left" />
            <span class="text-caption"
              ><span class="os-semibold">Preventa</span> $50.00</span
            >
          </div>
          <div>
            <q-icon name="paid" class="on-left" />
            <span class="text-caption"
              ><span class="os-semibold">Precio regular</span> $50.00</span
            >
          </div>
          <div>
            <q-icon name="place" class="on-left" />
            <span class="text-caption"
              >Centro de Convenciones Atlapa | 16km</span
            >
          </div>
          <div>
            <q-icon name="people" class="on-left" />
            <span class="text-caption">18+</span>
          </div>
        </q-card-section>
        <q-separator class="q-mx-lg" color="os-grey-dark" />
        <q-card-section>
          <div class="text-subtitle2 q-mb-md">Patrocinadores</div>
          <div class="row">
            <div class="col-xs-2 q-px-sm flex flex-center">
              <img
                src="@/assets/sponsor/Cable_Onda.png"
                style="width: 100%"
                class="q-mb-md"
              />
            </div>
            <div class="col-xs-2 q-px-sm flex flex-center">
              <img
                src="@/assets/sponsor/Cerveceria.jpg"
                style="width: 100%"
                class="q-mb-md"
              />
            </div>
            <div class="col-xs-2 q-px-sm flex flex-center">
              <img
                src="@/assets/sponsor/DelMonte.png"
                style="width: 100%"
                class="q-mb-md"
              />
            </div>
            <div class="col-xs-2 q-px-sm flex flex-center">
              <img
                src="@/assets/sponsor/Durex-Logo.png"
                style="width: 100%"
                class="q-mb-md"
              />
            </div>
            <div class="col-xs-2 q-px-sm flex flex-center">
              <img
                src="@/assets/sponsor/Goldmills.png"
                style="width: 100%"
                class="q-mb-md"
              />
            </div>
            <div class="col-xs-2 q-px-sm flex flex-center">
              <img
                src="@/assets/sponsor/Logo_Tigo.svg.png"
                style="width: 100%"
                class="q-mb-md"
              />
            </div>
            <div class="col-xs-2 q-px-sm flex flex-center">
              <img
                src="@/assets/sponsor/Metro.png"
                style="width: 100%"
                class="q-mb-md"
              />
            </div>
            <div class="col-xs-2 q-px-sm flex flex-center">
              <img
                src="@/assets/sponsor/PioPio.webp"
                style="width: 100%"
                class="q-mb-md"
              />
            </div>
            <div class="col-xs-2 q-px-sm flex flex-center">
              <img
                src="@/assets/sponsor/Wigo.png"
                style="width: 100%"
                class="q-mb-md"
              />
            </div>
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
    <!-- <loading-overlay :display="loadingStatus" /> -->
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      settings: {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        arrows: false,
      },
    };
  },
  methods: {
    ...mapActions("homeStore", ["getSelectedEvent"]),
  },
  computed: {
    ...mapState("homeStore", ["selectedEvent", "emptySelectedEvent"]),

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
    // this.emptySelectedEvent();
  },
};
</script>

<style>
.os-event-details {
  border-top-left-radius: 15px !important;
  border-top-right-radius: 15px !important;
}
</style>
