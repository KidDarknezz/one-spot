<template>
  <q-page>
    <!-- HERO -->
    <q-img
      :src="mainCover.assets.cover"
      class="text-white text-bold q-mb-md os-main-cover"
      v-if="mainCover"
    >
    </q-img>
    <!-- /HERO -->

    <!-- SPOTLIGHT -->
    <div
      class="row q-py-md q-px-lg"
      v-for="(event, i) in sponsoredEvents"
      :key="i"
    >
      <q-card
        class="full-width"
        flat
        @click="$router.push(`/event/${event.id}`)"
      >
        <q-img :src="event.assets.tile" class="os-spotlight-tile" />
        <q-card-section>
          <div class="row">
            <div class="col">
              <div class="text-subtitle2">{{ event.name }}</div>
            </div>
            <div class="col">
              <div class="text-caption text-right text-grey-6">Taberna 21</div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="text-caption text-grey-6">22 de Enero 2022</div>
            </div>
            <div class="col">
              <div class="text-caption text-right text-grey-6">14 km</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <!-- /SPOTLIGHT -->

    <!-- RECENTLY ADDED -->
    <div
      class="os-recent-section q-my-md q-mx-lg text-white"
      v-if="createdRecently.length > 0"
    >
      <div class="text-subtitle2 q-pa-md">Recien agregados</div>
      <div class="row">
        <div
          class="col-xs-4 q-pa-md"
          v-for="(event, i) in createdRecently"
          :key="i"
        >
          <q-img
            :src="event.assets.thumbnail"
            class="os-event-thumbnail q-mb-sm"
          />
          <div class="text-caption">{{ event.name }}</div>
          <div class="text-caption text-grey-6">Sum text</div>
        </div>
      </div>
    </div>
    <!-- /RECENTLY ADDED -->
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