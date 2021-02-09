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

    <!-- <q-parallax
      :src="require('@/assets/hero.webp')"
      :height="600"
      :speed="0.5"
      style="width: 100%"
    >
      <div class="text-h4 text-bold text-white">OneSpot</div>
    </q-parallax> -->

    <!-- /HERO -->

    <!-- MAIN CAROUSEL -->
    <div class="text-h5 q-pa-md">Destacados</div>
    <carousel-3d :animationSpeed="200" :space="440" :height="470">
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

    <div class="row">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut
      pretium erat. In non porttitor ante. Orci varius natoque penatibus et
      magnis dis parturient montes, nascetur ridiculus mus. Quisque eu tincidunt
      magna. Mauris ipsum nisi, facilisis feugiat libero non, tempus sodales
      nisl. Proin mauris est, fermentum vel dui in, varius rutrum nibh. Nulla
      vitae risus sit amet risus varius condimentum. Suspendisse pulvinar congue
      ipsum, auctor dictum lacus. Sed elit quam, placerat vel vehicula in,
      varius ac elit. Duis sit amet semper urna. Maecenas a dignissim mi.
      Vivamus eget pellentesque tortor, id commodo nisl. Sed commodo ante in sem
      cursus, vitae iaculis metus tempus. Mauris id turpis sit amet sapien
      viverra fringilla. Vestibulum et massa non tortor luctus volutpat sit amet
      vel urna. Proin porta pharetra neque facilisis auctor. Praesent mattis
      aliquam risus vitae ullamcorper. Suspendisse elementum porta libero, non
      convallis nisl mollis eget. Mauris porttitor vel purus eget aliquet.
      Aliquam consectetur metus ac risus pretium, vel egestas sapien efficitur.
      Donec ligula leo, ullamcorper et felis sed, convallis pretium sem. Morbi
      mauris ligula, venenatis in iaculis quis, consequat ac risus. Nulla
      convallis sagittis turpis, sed mattis metus tempus a. Donec tellus ipsum,
      dignissim sed venenatis ac, suscipit vel felis. Morbi in egestas leo. Cras
      eu quam condimentum, lacinia eros in, rhoncus felis. Praesent vulputate
      sollicitudin elementum. Mauris ullamcorper rutrum odio non tristique.
      Donec tristique sapien elit, et aliquam nisl rutrum a. Praesent urna
      mauris, lobortis id sem ut, pellentesque porta sem. Etiam tristique ac
      sapien in eleifend. Maecenas tristique risus eget efficitur malesuada.
      Curabitur id imperdiet odio. Maecenas id efficitur nibh. Suspendisse
      lobortis, urna at facilisis egestas, tellus urna volutpat ex, vitae
      efficitur neque metus sit amet mi. Integer dapibus odio vel velit
      elementum condimentum. Proin feugiat hendrerit euismod. Ut fermentum, mi
      vel condimentum placerat, erat metus facilisis lacus, ut condimentum justo
      libero sed nisl. Nulla sem nulla, tempor a diam et, rutrum luctus libero.
      Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
      cubilia curae;
    </div>

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