<template>
  <q-page class="q-pa-lg" v-if="selectedEvent">
    <div class="row q-mb-xl">
      <q-btn
        label="Regresar"
        no-caps
        rounded
        icon="arrow_back"
        flat
        dense
        size="sm"
        color="black"
        unelevated
        class="os-semibold q-mr-lg"
        @click="$router.go(-1)"
      />
      <div class="text-h5 os-semibold">
        Event name
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4 q-px-sm">
        <q-card flat class="bg-grey-2">
          <q-card-section>
            <q-input
              label="Nombre"
              filled
              readonly
              v-model="selectedEvent.name"
              class="q-mb-md"
            />
            <q-input
              label="Subtitulo"
              filled
              readonly
              v-model="selectedEvent.subtitle"
              class="q-mb-md"
            />
            <q-input
              label="Descripcion"
              filled
              readonly
              type="textarea"
              rows="4"
              v-model="selectedEvent.description"
              class="q-mb-md"
            />
            <q-input
              label="Organizador"
              filled
              readonly
              v-model="selectedEvent.ownerName"
              class="q-mb-md"
            />
            <div v-for="(dateTime, i) in selectedEvent.dateAndTime" :key="i">
              <div class="text-body2 q-mb-sm">Fecha {{ i + 1 }}</div>
              <div class="row">
                <div class="col">
                  <q-input
                    label="Fecha de inicio"
                    filled
                    readonly
                    v-model="dateTime.startDate"
                    class="q-mb-md q-mr-sm"
                  />
                </div>
                <div class="col">
                  <q-input
                    label="Hora de inicio"
                    filled
                    readonly
                    v-model="dateTime.startTime"
                    class="q-mb-md q-ml-sm"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <q-input
                    label="Fecha de fin"
                    filled
                    readonly
                    v-model="dateTime.endDate"
                    class="q-mb-md q-mr-sm"
                  />
                </div>
                <div class="col">
                  <q-input
                    label="Hora de fin"
                    filled
                    readonly
                    v-model="dateTime.endTime"
                    class="q-mb-md q-ml-sm"
                  />
                </div>
              </div>
            </div>
            <div class="text-body2 q-mb-sm">Categorias</div>
            <div class="row">
              <div
                class="os-cat-cta on-left"
                v-for="cat in selectedEvent.selectedCategories"
                :key="cat"
              >
                {{ cat }}
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4">
        <q-card flat class="bg-grey-2 q-mb-md">
          <q-card-section>
            <q-input
              label="Lugar"
              filled
              readonly
              v-model="selectedEvent.place"
              class="q-mb-md"
            />
          </q-card-section>
        </q-card>
        <GmapMap
          :center="{
            lat: selectedEvent.coords.lat,
            lng: selectedEvent.coords.lng,
          }"
          :zoom="17"
          map-type-id="roadmap"
          style="width: 100%; height: 400px"
        >
          <GmapMarker :position="selectedEvent.coords" />
        </GmapMap>
      </div>
      <div class="col-lg-3 q-px-sm">
        <img
          :alt="
            returnEventAsset(
              selectedEvent.owner,
              selectedEvent.flyer,
              $route.params.id
            )
          "
          :id="$route.params.id"
          width="100%"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import firebase from "firebase/app";
import "firebase/storage";

export default {
  data() {
    return {
      eventData: null,
    };
  },
  methods: {
    ...mapActions("dashboardStore", ["getSelectedEvent"]),

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
    ...mapState("dashboardStore", ["selectedEvent"]),
  },
  mounted() {
    this.getSelectedEvent(this.$route.params.id);
  },
};
</script>
