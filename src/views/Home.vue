<template>
  <q-page>
    <!-- SEARCH BOX -->
    <!-- <div class="row fixed-top q-pa-md" style="z-index: 1" id="search-box">
      <div
        class="bg-grey-2 text-grey-6 full-width text-center q-pa-md os-search"
        @click="searchDialog = true"
      >
        <q-icon name="fas fa-search" class="q-mr-xs" />
        Buscar evento
      </div>
    </div> -->
    <!-- /SEARCH BOX -->

    <!-- HERO -->
    <q-img
      :src="require('@/assets/main_cover.jpg')"
      class="text-white text-bold q-mb-md os-main-cover"
    >
    </q-img>
    <!-- /HERO -->

    <!-- SPOTLIGHT -->
    <div class="row q-pa-md" v-for="(event, i) in 3" :key="i">
      <q-card class="full-width" flat @click="$router.push('/event/asdf')">
        <q-img
          :src="require('@/assets/spotlight_tile_2.webp')"
          class="os-spotlight-tile"
        />
        <q-card-section>
          <div class="row">
            <div class="col">
              <div class="text-subtitle2">Music Event</div>
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
    <div class="os-recent-section q-ma-md text-white">
      <div class="text-subtitle2 q-pa-md">Recien agregados</div>
      <div class="row">
        <div class="col-xs-4 q-pa-md" v-for="(event, i) in 4" :key="i">
          <q-img
            :src="require('@/assets/event_thumbnail.webp')"
            class="os-event-thumbnail q-mb-sm"
          />
          <div class="text-caption">Music Event</div>
          <div class="text-caption text-grey-6">Sum text</div>
        </div>
      </div>
    </div>
    <!-- /RECENTLY ADDED -->
  </q-page>
</template>


<script>
export default {
  data() {
    return {
      searchDialog: false,
      slides: 7,
    };
  },
  mounted() {
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