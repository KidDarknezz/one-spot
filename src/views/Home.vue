<template>
  <q-page>
    <!-- SEARCH BOX -->
    <div class="row fixed-top q-pa-md" style="z-index: 1" id="search-box">
      <div
        class="bg-grey-2 full-width text-center q-pa-md text-bold os-search"
        @click="searchDialog = true"
      >
        <q-icon name="fas fa-search" class="text-accent q-mr-xs" />
        Eventos
      </div>
    </div>
    <!-- /SEARCH BOX -->

    <!-- HERO -->
    <q-img :src="require('@/assets/hero.webp')" class="text-white text-bold">
      <span class="absolute-full text-h4 flex flex-center">One<br />Spot</span>
    </q-img>
    <!-- /HERO -->

    <!-- MAIN CAROUSEL -->
    <div class="text-h5 q-pa-md">Destacados</div>
    <carousel-3d style="height: 470px" :animationSpeed="200" :space="440">
      <slide
        v-for="(slide, i) in slides"
        :index="i"
        :key="i"
        style="border: none; height: 469px"
      >
        <img
          src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/upcoming-event-poster-template-4cb3419c3eb5816bb72a5c24a73de9bc_screen.jpg"
        />
      </slide>
    </carousel-3d>
    <!-- /MAIN CAROUSEL -->

    <!-- SEARCH DIALOG -->
    <q-dialog
      v-model="searchDialog"
      persistent
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-grey-2">
        <q-card-section>
          <div class="row">
            <div class="col-xs-2">
              <q-btn
                icon="arrow_back"
                round
                flat
                @click="searchDialog = false"
              />
            </div>
            <div class="col">
              <q-input borderless placeholder="Buscar evento" autofocus />
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <q-list separator>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar rounded>
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
              </q-item-section>
              <q-item-section>Eventos cerca de mi</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <div class="q-px-lg text-caption text-bold text-grey-6">
          Recomendados
        </div>
        <q-card-section>
          <q-list separator>
            <q-item
              clickable
              v-ripple
              v-for="(event, i) in 7"
              :key="i"
              class="q-py-md"
            >
              <q-item-section avatar>
                <q-avatar rounded>
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
              </q-item-section>
              <q-item-section>Event name</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- /SEARCH DIALOG -->
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
    const searchbox = document.querySelector("#search-box");
    window.addEventListener("scroll", () => {
      let scroll = (window.scrollY || window.pageYOffset) / 150;
      searchbox.style.backgroundColor = `rgba(255, 255, 255, ${scroll})`;
      searchbox.style.boxShadow = `0 1px 5px 0px rgba(156, 156, 156, ${scroll})`;
    });
  },
};
</script>

<style>
.os-search {
  border-radius: 30px;
}
</style>