<template>
  <q-page class="q-pa-lg">
    <div class="row q-mb-xl">
      <div class="text-h5 os-semibold">Mis Eventos Proximos (3)</div>
      <q-space />
      <q-btn
        label="Nuevo evento"
        no-caps
        rounded
        color="black"
        unelevated
        class="os-semibold"
        @click="newEventDialog = true"
      />
    </div>

    <div class="row q-mb-lg">
      <div class="col-lg-2 col-xs-12" v-for="(openEvent, i) in 3" :key="i">
        <div class="row">
          <div class="col-lg-4 col-xs-3 q-mb-lg">
            <img
              src="@/assets/event_1_thumbnail.webp"
              width="100%"
              class="os-rounded-border"
            />
          </div>
          <div class="col-lg-8 q-pa-sm">
            <div class="text-subtitle2 os-semibold">Event Title</div>
            <div class="text-caption text-grey-9">
              Event Sub-Title
            </div>
            <div class="text-caption text-grey-6">24 de enero 2022</div>
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
          <div class="col-lg-8 q-pa-sm">
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
              New event form will go here
            </q-card-section>
          </div>
          <q-space />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      newEventDialog: false,
    };
  },
};
</script>
