<template>
  <q-page>
    <!-- HERO -->
    <div class="q-px-md q-py-lg">
      <div class="q-mb-lg">
        <div
          class="row bg-grey-3 q-pa-md os-rounded-border"
          @click="$router.push('/search')"
        >
          <div class="flex flex-center">
            <q-icon name="search" color="grey-6" class="q-mr-sm" />
            <div class="text-body2 text-grey-6 os-semibold">
              Buscar evento
            </div>
          </div>
        </div>
      </div>
      <div class="text-h6 text-bold">
        Bienvenido a One Spot
      </div>
      <div class="text-subtitle text-bold q-mb-lg">
        Disfruta, explora y descubre
      </div>
      <q-carousel
        animated
        v-model="slide"
        navigation
        swipeable
        infinite
        style="height: auto; padding-bottom: 15px;"
        transition-prev="slide-right"
        transition-next="slide-left"
        control-color="os-pink"
        :autoplay="true"
        navigation-icon="radio_button_unchecked"
        navigation-active-icon="radio_button_checked"
        class="shadow-4 os-rounded-border"
      >
        <q-carousel-slide :name="1" class="q-pa-none">
          <q-card class="os-rounded-border q-mb-lg" flat>
            <q-card-section class="q-pa-sm">
              <img
                src="@/assets/event_2_thumbnail.webp"
                width="100%"
                class="os-rounded-border"
              />
            </q-card-section>
            <q-card-section>
              <div class="row">
                <div>
                  <div class="text-subtitle2 os-semibold">Event Title</div>
                  <div class="text-caption text-grey-9">
                    Event Sub-Title
                  </div>
                </div>
                <q-space />
                <div class="text-caption text-grey-6">24 de enero 2022</div>
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div class="text-caption os-semibold">
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                used in laying out print, graphic or web designs.
              </div>
            </q-card-section>
          </q-card>
        </q-carousel-slide>
        <!-- <q-carousel-slide :name="2" class="">
          <q-card class="os-rounded-border q-mb-lg" flat>
            <q-card-section>
              <img
                src="@/assets/event_1_thumbnail.webp"
                width="100%"
                class="os-rounded-border"
              />
            </q-card-section>
            <q-card-section>
              <div class="row">
                <div>
                  <div class="text-subtitle2 os-semibold">Event Title</div>
                  <div class="text-caption text-grey-9">
                    Event Sub-Title
                  </div>
                </div>
                <q-space />
                <div class="text-caption text-grey-6">24 de enero 2022</div>
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div class="text-caption os-semibold">
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                used in laying out print, graphic or web designs.
              </div>
            </q-card-section>
          </q-card>
        </q-carousel-slide> -->
      </q-carousel>
      <div class="text-body q-px-md text-center os-semibold q-py-lg">
        Quote del día: Sal y disfruta lo más que puedas que en un parpadeo es
        lunes denuevo
      </div>
    </div>
    <!-- /HERO -->

    <!-- THIS WEEK & SPOTLIGHT -->
    <div class="bg-os-grey-medium">
      <div
        class="bg-os-grey-dark q-py-lg os-rounded-border"
        style="border-top-left-radius: 0 !important; border-top-right-radius: 0 !important"
      >
        <div class="row q-mb-lg q-px-md">
          <div class="text-white text-h6 os-semibold">Esta semana</div>
          <q-space />
          <q-btn
            flat
            rounded
            label="Ver mas"
            dense
            size="sm"
            color="white"
            class="q-px-sm os-semibold"
            no-caps
          />
        </div>
        <div class="row">
          <div
            class="col-4 q-px-md q-mb-md text-white"
            v-for="(highlight, i) in 6"
            :key="i"
          >
            <img
              src="@/assets/event_4_thumbnail.webp"
              width="100%"
              class="os-rounded-border"
            />
            <div class="text-subtitle2 os-semibold">Event Title</div>
            <div class="text-caption">Event Sub-Title</div>
          </div>
        </div>
      </div>
      <div class="row q-px-md q-py-lg">
        <div class="text-white text-h6 os-semibold">Destacados</div>
        <q-space />
        <q-btn
          flat
          rounded
          label="Ver mas"
          dense
          size="sm"
          color="white"
          class="q-px-sm os-semibold"
          no-caps
        />
      </div>

      <VueSlickCarousel v-bind="settings">
        <div
          class="q-px-md text-white q-mb-lg"
          v-for="(highlight, i) in 5"
          :key="i"
          style="width: 43vw;"
        >
          <img
            src="@/assets/event_4_thumbnail.webp"
            width="100%"
            class="os-rounded-border q-mb-sm"
          />
          <div class="text-subtitle2 os-semibold">Event Title {{ i }}</div>
          <div class="text-caption">Event Sub-Title</div>
        </div>
      </VueSlickCarousel>
    </div>
    <!-- /THIS WEEK & SPOTLIGHT -->

    <!-- RECOMMENDED -->
    <div class="q-px-md q-py-lg">
      <div class="row q-mb-lg">
        <div class="text-h6 os-semibold">
          Recomendado
        </div>
        <q-space />
        <q-btn
          flat
          rounded
          label="Ver mas"
          dense
          size="sm"
          color="os-grey-dark"
          class="q-px-sm os-semibold"
          no-caps
          to="/recommended"
        />
      </div>
      <div
        class="row q-mb-md"
        v-for="(recommended, i) in recommendedEvents.slice(0, 4)"
        :key="i"
        @click="$router.push(`/event/${recommended.id}`)"
      >
        <div class="col-4">
          <img
            :src="recommended.flyer"
            class="os-rounded-border"
            style="width: 100%;"
          />
        </div>
        <div class="col-8 q-pa-md">
          <div class="text-subtitle2 os-semibold">{{ recommended.name }}</div>
          <div class="text-caption text-grey-9">{{ recommended.subtitle }}</div>
          <div class="text-caption text-grey-6">
            {{ recommended.dateAndTime[0].startDate }}
          </div>
        </div>
      </div>
    </div>
    <!-- /RECOMMENDED -->
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  data() {
    return {
      searchDialog: false,
      slides: 7,
      slide: 1,
      settings: {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 2,
        variableWidth: true,
        arrows: false,
      },
    };
  },
  methods: {
    ...mapActions("homeStore", ["getHomeEvents", "getRecommendedEvents"]),

    reload() {
      location.reload();
    },
  },
  computed: {
    ...mapState("homeStore", ["recommendedEvents"]),
    ...mapState("authStore", ["activeUser"]),
  },
  components: { VueSlickCarousel },
  mounted() {
    if (this.recommendedEvents.length <= 0)
      this.getRecommendedEvents(this.activeUser.interests);
  },
};
</script>

<style>
/* ---- */
.os-main-cover {
  -webkit-mask-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(0, 0, 0, 1)),
    to(rgba(0, 0, 0, 0))
  );
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}

.os-recent-section {
  border-radius: 15px;
  background-color: #242424;
}
.os-event-thumbnail {
  border-radius: 15px;
}
</style>
