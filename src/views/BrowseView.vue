<template>
  <q-page>
    <div class="q-px-md q-pt-md">
      <q-input v-model="search" filled color="os-pink">
        <template v-slot:prepend>
          <q-icon name="search" color="os-pink" />
        </template>
        <template v-if="search" v-slot:append>
          <q-icon
            name="cancel"
            color="os-grey-medium"
            @click.stop="search = null"
            class="cursor-pointer"
          />
        </template>
      </q-input>
    </div>
    <div class="row q-pa-md">
      <div class="col q-mr-sm">
        <div class="os-cat-cta q-py-sm">
          <q-icon name="o_place" />
          Panamá, Panamá
        </div>
      </div>
      <div class="col q-ml-sm">
        <div class="os-cat-cta q-py-sm">
          <q-icon name="calendar_today" />
          Hoy, 16 de Abril
        </div>
      </div>
    </div>
    <q-card flat>
      <q-tabs
        v-model="tab"
        dense
        class="text-black"
        active-color="os-pink"
        indicator-color="os-pink"
        align="justify"
      >
        <q-tab name="events" label="Eventos" no-caps class="q-py-sm" />
        <q-tab name="categories" label="Categorías" no-caps class="q-py-sm" />
        <q-tab name="promoter" label="Promotor" no-caps class="q-py-sm" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="events" class="q-pa-none">
          <div class="row bg-os-grey-medium q-pa-md">
            <div class="text-h6 os-semibold text-white">Descatados</div>
            <q-space />
            <q-btn
              label="Ver más"
              dense
              rounded
              size="sm"
              flat
              color="white"
              no-caps
              class="q-px-sm os-semibold"
            />
          </div>
          <div class="bg-os-grey-dark">
            <div class="q-pa-md text-subtitle2 os-semibold text-white q-mb-sm">
              Hechos y eventos históricos que tiene lugar hoy. Artículos que
              relatan los momentos más importantes de la historia, como el
              Movimiento.
            </div>
            <VueSlickCarousel v-bind="settings">
              <event-column
                style="width: 43vw;"
                v-for="(highlight, i) in 5"
                :key="i"
              />
            </VueSlickCarousel>
          </div>
          <div class="row bg-os-grey-medium q-pa-md">
            <div class="text-h6 os-semibold text-white">Sponsored</div>
            <q-space />
            <q-btn
              label="Ver más"
              dense
              rounded
              size="sm"
              flat
              color="white"
              no-caps
              class="q-px-sm os-semibold"
            />
          </div>
          <div class="bg-os-grey-dark">
            <div class="q-pa-md text-subtitle2 os-semibold text-white q-mb-sm">
              <div class="row q-py-md">
                <q-avatar size="60px">
                  <img src="https://cdn.quasar.dev/img/avatar.png" />
                </q-avatar>
                <div class="on-right">
                  <div class="text-h6 text-white os-semibold">
                    SHOW PRO PANAMA
                  </div>
                  <div class="text-subtitle2 text-white os-semibold">
                    Organizador
                  </div>
                </div>
              </div>

              Hechos y eventos históricos que tiene lugar hoy. Artículos que
              relatan los momentos más importantes de la historia, como el
              Movimiento.
            </div>
            <VueSlickCarousel v-bind="settings">
              <event-column
                style="width: 43vw;"
                v-for="(highlight, i) in 5"
                :key="i"
              />
            </VueSlickCarousel>
          </div>
          <div>
            <div class="row q-pa-md">
              <div class="text-h6 os-semibold text-os-grey-dark">
                Recomendados
              </div>
              <q-space />
              <q-btn
                label="Ver más"
                rounded
                dense
                size="sm"
                flat
                color="q-px-sm os-grey-dark"
                no-caps
                class="os-semibold"
              />
            </div>
            <event-row />
            <event-row />
            <event-row />
          </div>
        </q-tab-panel>
        <q-tab-panel name="categories" class="q-pa-none">
          <div class="text-h6 text-os-grey-dark os-semibold q-pa-md">Tags</div>
          <div class="row q-px-sm q-mb-lg">
            <div class="col q-px-sm">
              <div class="os-cat-cta">Aire Libre</div>
            </div>
            <div class="col q-px-sm">
              <div class="os-cat-cta">Discotecas</div>
            </div>
            <div class="col q-px-sm">
              <div class="os-cat-cta">Bares</div>
            </div>
            <div class="col q-px-sm">
              <div class="os-cat-cta-selected">Ver más</div>
            </div>
          </div>
          <q-list>
            <q-item
              clickable
              v-ripple
              v-for="category in categories"
              :key="category.value"
            >
              <q-item-section avatar>
                <img
                  :src="require(`@/assets/categories/${category.image}`)"
                  class="os-rounded-border"
                />
              </q-item-section>
              <q-item-section>
                <div class="text-h6 os-bold text-os-grey-dark">
                  {{ category.label }}
                </div>
              </q-item-section>
              <q-item-section avatar>
                <q-icon color="os-grey-dark" name="navigate_next" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>
        <q-tab-panel name="promoter" class="q-pa-none">
          <q-list>
            <q-item
              clickable
              v-ripple
              v-for="(promoter, i) in 5"
              :key="i"
              to="/promoter"
            >
              <q-item-section avatar>
                <q-avatar size="50px">
                  <img src="https://cdn.quasar.dev/img/avatar.png" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <div class="text-h6 os-bold text-os-grey-dark">
                  SHOW PRO PANAMA
                </div>
              </q-item-section>
              <q-item-section avatar>
                <q-icon color="os-grey-dark" name="navigate_next" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";

export default {
  data() {
    return {
      search: null,
      tab: "events",
      settings: {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 2,
        variableWidth: true,
        arrows: false,
      },
      categories: [
        {
          value: "concerts",
          label: "Conciertos",
          image: "OS21_APP_Categories_Conciertos.png",
        },
        {
          value: "family",
          label: "Familia",
          image: "OS21_APP_Categories_Familia.png",
        },
        {
          value: "sports",
          label: "Deportes",
          image: "OS21_APP_Categories_Deportes.png",
        },
        {
          value: "theatre",
          label: "Teatro",
          image: "OS21_APP_Categories_Teatro.png",
        },
        {
          value: "culture",
          label: "Cultura",
          image: "OS21_APP_Categories_Cultura.png",
        },
        {
          value: "conferences",
          label: "Conferencias",
          image: "OS21_APP_Categories_Conferencias.png",
        },
        {
          value: "nightlife",
          label: "Nightlife",
          image: "OS21_APP_Categories_Night-Life.png",
        },
      ],
    };
  },
  components: {
    VueSlickCarousel,
  },
  mounted() {
    window.scrollTo(0, 0);
    const urlParams = window.location.search;
    const params = new URLSearchParams(urlParams);
    if (params.get("tab") == "promoter") this.tab = "promoter";
  },
};
</script>
