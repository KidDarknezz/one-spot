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

export default {
  data() {
    return {
      newEvent: {
        name: "",
        subtitle: "",
        description: "",
        selectedCategories: [],
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
      categories: [
        {
          label: "Cat 1",
          value: "cat_1",
        },
        {
          label: "Cat 2",
          value: "cat_2",
        },
        {
          label: "Cat 3",
          value: "cat_3",
        },
        {
          label: "Cat 4",
          value: "cat_4",
        },
        {
          label: "Cat 5",
          value: "cat_5",
        },
        {
          label: "Cat 6",
          value: "cat_6",
        },
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
      await this.createEvent(this.newEvent);
      this.$emit("closeNewEventDialog");
    },
  },
};
</script>
