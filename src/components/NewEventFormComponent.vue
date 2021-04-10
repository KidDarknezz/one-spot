<template>
  <q-form @submit="postEvent()">
    <q-card flat>
      <q-card-section>
        <div class="text-h6 os-font os-semibold q-px-sm">Nuevo evento</div>
      </q-card-section>
      <q-card-section>
        <q-input
          label="Nombre del evento"
          filled
          color="pink"
          v-model="newEvent.name"
          class="q-px-sm q-mb-md"
          :rules="[(val) => !!val || 'Este campo es requerido']"
        />
        <q-input
          label="Sub-titulo"
          filled
          color="pink"
          v-model="newEvent.subtitle"
          class="q-px-sm q-mb-md"
          :rules="[(val) => !!val || 'Este campo es requerido']"
        />
        <q-input
          label="Descripcion"
          filled
          color="pink"
          type="textarea"
          rows="4"
          v-model="newEvent.description"
          class="q-px-sm q-mb-md"
          :rules="[(val) => !!val || 'Este campo es requerido']"
        />
        <q-select
          label="Categorias"
          color="pink"
          filled
          v-model="newEvent.selectedCategories"
          multiple
          :options="categories"
          counter
          max-values="5"
          hint="Max 5 selecciones"
          class="q-px-sm q-mb-md"
          :rules="[(val) => val.length > 0 || 'Este campo es requerido']"
          map-options
          emit-value
        />
        <div v-for="(date, i) in newEvent.dateAndTime" :key="i">
          <div class="row">
            <div class="text-subtitle2 q-pa-sm os-font os-semibold">
              Fecha {{ i + 1 }}
            </div>
            <q-space />
            <div class="flex flex-center q-pr-sm">
              <q-btn
                icon="close"
                flat
                round
                size="sm"
                @click="removeDate(i)"
                :disable="newEvent.dateAndTime.length <= 1"
              />
            </div>
          </div>
          <div class="row q-mb-md">
            <div class="col q-px-sm">
              <q-input
                filled
                v-model="newEvent.dateAndTime[i].startDate"
                mask="date"
                color="pink"
                label="Fecha de inicio"
                :rules="[(val) => !!val || 'Este campo es requerido']"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="newEvent.dateAndTime[i].startDate"
                        color="pink"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            label="Close"
                            color="primary"
                            flat
                            v-close-popup
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col q-px-sm">
              <q-input
                filled
                v-model="newEvent.dateAndTime[i].startTime"
                mask="time"
                color="pink"
                label="Hora de inicio"
                :rules="[(val) => !!val || 'Este campo es requerido']"
              >
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time
                        v-model="newEvent.dateAndTime[i].startTime"
                        color="pink"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            label="Close"
                            color="primary"
                            flat
                            v-close-popup
                          />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div class="row q-mb-md">
            <div class="col q-px-sm">
              <q-input
                filled
                v-model="newEvent.dateAndTime[i].endDate"
                mask="date"
                color="pink"
                label="Fecha de fin"
                :rules="[(val) => !!val || 'Este campo es requerido']"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="newEvent.dateAndTime[i].endDate"
                        color="pink"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            label="Close"
                            color="primary"
                            flat
                            v-close-popup
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col q-px-sm">
              <q-input
                filled
                v-model="newEvent.dateAndTime[i].endTime"
                mask="time"
                color="pink"
                label="Hora de fin"
                :rules="[(val) => !!val || 'Este campo es requerido']"
              >
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time
                        v-model="newEvent.dateAndTime[i].endTime"
                        color="pink"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            label="Close"
                            color="primary"
                            flat
                            v-close-popup
                          />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </div>
        <div class="row q-mb-lg">
          <q-space />
          <div class="flex flex-center q-pr-sm">
            <q-btn
              label="Fecha adicional"
              icon="add"
              flat
              rounded
              size="sm"
              color="pink"
              class="os-font os-semibold"
              @click="addExtraDate()"
            />
          </div>
        </div>
        <q-input
          label="Lugar"
          filled
          color="pink"
          :rules="[(val) => !!val || 'Este campo es requerido']"
          class="q-px-sm q-mb-md"
          v-model="newEvent.place"
        />
        <div class="q-px-sm q-mb-lg">
          <GoogleMaps
            @markerPosition="setMarkerPosition"
            @newMarkerPosition="setNewMarkerPosition"
            :editable="true"
            :markers="markers"
            :mapCenter="center"
          ></GoogleMaps>
        </div>
        <q-file
          v-model="newEvent.flyer"
          label="Adjuntar flyer"
          filled
          color="pink"
          class="q-px-sm q-mb-md"
          :rules="[(val) => !!val || 'Este campo es requerido']"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
        <q-file
          v-model="newEvent.thumbnail"
          label="Adjuntar thumbnail"
          filled
          color="pink"
          class="q-px-sm"
          :rules="[(val) => !!val || 'Este campo es requerido']"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </q-card-section>
      <q-card-actions>
        <q-space />
        <q-btn
          label="Cancelar"
          flat
          rounded
          class="q-px-sm os-font os-semibold"
          dense
          v-close-popup
        />
        <q-btn
          label="Crear"
          type="submit"
          flat
          rounded
          color="pink"
          class="q-px-sm os-font os-semibold"
          dense
        />
      </q-card-actions>
    </q-card>
  </q-form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import GoogleMaps from "@/components/GoogleMaps";

export default {
  data() {
    return {
      newEvent: {
        name: "",
        subtitle: "",
        description: "",
        selectedCategories: [],
        place: "",
        dateAndTime: [
          {
            startDate: "",
            startTime: "",
            endDate: "",
            endTime: "",
          },
        ],
        flyer: null,
        thumbnail: null,
      },
      location: [],
      markers: [],
      center: {},
      locationVerified: false,
      categories: [
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
  methods: {
    ...mapActions("dashboardStore", ["createEvent"]),

    addExtraDate() {
      this.newEvent.dateAndTime.push({
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
      });
    },
    removeDate(i) {
      this.newEvent.dateAndTime.splice(i, 1);
    },
    async postEvent() {
      let ev = this.newEvent;
      ev.coords = this.location;
      await this.createEvent({ event: ev, owner: this.activeUser });
      this.$emit("closeNewEventDialog");
    },
    setMarkerPosition(event) {
      this.locationVerified = false;
      this.location = event;
    },
    setNewMarkerPosition(event) {
      this.locationVerified = false;
      this.markers = [{ position: event }];
      this.location = event;
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.center = {
            lat: parseFloat(position.coords.latitude),
            lng: parseFloat(position.coords.longitude),
          };
          this.markers.push({ position: this.center });
        },
        (error) => {
          this.center = {
            lat: parseFloat(9.068463),
            lng: parseFloat(-79.452694),
          };
          this.markers.push({ position: this.center });
        }
      );
    },
    printLatLng() {
      console.log(this.markers);
    },
  },
  computed: {
    ...mapState("authStore", ["activeUser"]),
  },
  mounted() {
    this.geolocate();
  },
  components: {
    GoogleMaps,
  },
};
</script>
