<template>
  <q-page>
    <!-- HERO -->
    <div style="height: 100vh">
      <div class="q-px-md flex flex-center" style="height: 100%">
        <div>
          <div class="text-h5 text-bold q-mb-lg q-px-md">Lo más HOT</div>
          <q-carousel
            animated
            v-model="slide"
            navigation
            swipeable
            infinite
            style="height: auto; padding-bottom: 15px;"
            transition-prev="slide-right"
            transition-next="slide-left"
            control-color="pink"
            :autoplay="true"
            navigation-icon="radio_button_unchecked"
            navigation-active-icon="radio_button_checked"
          >
            <q-carousel-slide :name="1" class="">
              <q-card class="os-rounded-border q-mb-lg">
                <q-card-section>
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
                    Lorem ipsum, or lipsum as it is sometimes known, is dummy
                    text used in laying out print, graphic or web designs.
                  </div>
                </q-card-section>
              </q-card>
            </q-carousel-slide>
            <q-carousel-slide :name="2" class="">
              <q-card class="os-rounded-border q-mb-lg">
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
                    Lorem ipsum, or lipsum as it is sometimes known, is dummy
                    text used in laying out print, graphic or web designs.
                  </div>
                </q-card-section>
              </q-card>
            </q-carousel-slide>
          </q-carousel>
          <div class="text-subtitle2 q-px-md">
            Quote del día: Sal y disfruta lo más que puedas que en un parpadeo
            es lunes denuevo
          </div>
        </div>
      </div>
    </div>
    <!-- <img
      :src="mainCover.assets.cover"
      class="text-white text-bold q-mb-md os-main-cover full-width"
      v-if="mainCover"
    /> -->
    <!-- /HERO -->

    <!-- SPOTLIGHT -->
    <div class="bg-pink q-px-lg ">
      <div class="row q-py-lg q-px-sm">
        <div class="text-white text-subtitle2 os-semibold">Destacados</div>
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
      <div class="row q-pb-lg">
        <div
          class="col-6 q-px-sm q-mb-md text-white"
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
    <!-- /SPOTLIGHT -->

    <!-- THIS WEEK -->
    <div class="os-recent-section q-my-md q-mx-lg q-mt-lg text-white">
      <div class="row q-pa-md">
        <div class="text-subtitle2  os-semibold">Esta semana</div>
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
        <div class="col-xs-4 q-pa-md" v-for="(event, i) in 6" :key="i">
          <img
            src="@/assets/event_3_thumbnail.webp"
            class="os-event-thumbnail q-mb-sm full-width"
          />
          <div class="text-caption">Event Title</div>
          <div class="text-caption text-grey-6">Event SubTitle</div>
        </div>
      </div>
    </div>
    <!-- /THIS WEEK -->

    <!-- RECOMMENDED -->
    <div class="q-pa-lg">
      <div class="row q-mb-lg">
        <div class="text-h5 os-semibold">Recomendado</div>
        <q-space />
        <q-btn
          flat
          rounded
          label="Ver mas"
          dense
          size="sm"
          color="pink"
          class="q-px-sm os-semibold"
          no-caps
        />
      </div>
      <div class="row q-mb-md" v-for="(recommended, i) in 4" :key="i">
        <div class="col-4">
          <img
            src="@/assets/event_2_thumbnail.webp"
            width="100%"
            class="os-rounded-border"
          />
        </div>
        <div class="col-8 q-pa-md">
          <div class="text-subtitle2 os-semibold">Event Title</div>
          <div class="text-caption text-grey-9">Event Sub-Title</div>
          <div class="text-caption text-grey-6">24 de enero 2022</div>
        </div>
      </div>
    </div>
    <!-- /RECOMMENDED -->
    <loading-overlay :display="showLoading" />
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      searchDialog: false,
      slides: 7,
      slide: 1,
    };
  },
  methods: {
    ...mapActions("homeStore", ["getHomeEvents"]),
  },
  computed: {
    ...mapState("homeStore", [
      "mainCover",
      "sponsoredEvents",
      "createdRecently",
    ]),
    showLoading() {
      if (
        this.mainCover &&
        this.sponsoredEvents.length > 0 &&
        this.createdRecently.length > 0
      )
        return false;
      else return true;
    },
  },
  mounted() {
    if (this.sponsoredEvents.length == 0) this.getHomeEvents();
    // const searchbox = document.querySelector("#search-box");
    // window.addEventListener("scroll", () => {
    //   let scroll = (window.scrollY || window.pageYOffset) / 150;
    //   searchbox.style.backgroundColor = `rgba(255, 255, 255, ${scroll})`;
    //   searchbox.style.boxShadow = `0 1px 5px 0px rgba(156, 156, 156, ${scroll})`;
    // });
  },
};
</script>

<style>
.os-rounded-border {
  border-radius: 20px !important;
}
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
.os-search {
  border-radius: 15px;
}

.os-spotlight-tile {
  border-radius: 15px !important;
}
.os-recent-section {
  border-radius: 15px;
  background-color: #242424;
}
.os-event-thumbnail {
  border-radius: 15px;
}
</style>
