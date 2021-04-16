<template>
  <div>
    <!-- EVENT DETAILS -->
    <q-card class="q-pa-md bg-grey-2 os-event-details">
      <q-card-section>
        <div class="row q-mb-md">
          <div class="col-xs-8">
            <div class="text-h6 os-bold">{{ data.name }}</div>
            <div class="text-subtitle">{{ data.subtitle }}</div>
          </div>
          <div class="col">
            <q-btn
              round
              flat
              icon="favorite_border"
              class="on-right"
              style="float: right"
            />
            <q-btn round flat icon="o_share" style="float: right" />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-8">
            <q-avatar>
              <img :src="activeUser.profile" />
            </q-avatar>
            <span class="text-subtitle2 on-right">{{ activeUser.name }}</span>
          </div>
          <div class="col flex flex-center">
            <div class="full-width">
              <q-btn
                label="Follow"
                color="pink"
                unelevated
                rounded
                no-caps
                dense
                class="q-px-md"
                style="float: right"
              />
            </div>
          </div>
        </div>

        <div class="text-caption">
          {{ data.dateAndTime[0].startDate }}
        </div>
      </q-card-section>
      <q-separator class="q-my-md" />
      <q-card-section>
        <div class="text-body">
          {{ data.description }}
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div
            class="col q-px-xs"
            v-for="cat in data.selectedCategories"
            :key="cat"
          >
            <div class="os-cat-cta ">
              {{ categoryName(cat) }}
            </div>
          </div>
        </div>
      </q-card-section>
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
        <q-btn label="Guardar" class="full-width" no-caps color="accent" push />
      </q-card-actions>
    </q-card>
    <!-- /EVENT DETAILS -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import categoriesMixin from "@/mixins/categoriesMixin";

export default {
  props: ["data", "user"],
  mixins: [categoriesMixin],
  computed: {
    ...mapState("authStore", ["activeUser"]),
    flyer() {
      return this.data.flyer;
    },
  },
  watch: {
    flyer() {
      let reader = new FileReader();
      let imgtag = document.getElementById("eventCover");
      imgtag.title = this.data.flyer.name;
      reader.onload = function(event) {
        imgtag.src = event.target.result;
      };
      reader.readAsDataURL(this.data.flyer);
    },
  },
};
</script>
