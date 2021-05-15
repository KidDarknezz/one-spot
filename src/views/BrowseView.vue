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

      <q-tab-panels v-model="tab" animated swipeable>
        <q-tab-panel name="events" class="q-pa-none">
          <div class="row bg-os-grey-medium q-pa-md">
            <div class="text-h6 os-semibold text-white">Descatados</div>
            <q-space />
            <q-btn
              label="Ver más"
              rounded
              flat
              color="white"
              no-caps
              class="os-semibold"
            />
          </div>
          <div class="bg-os-grey-dark">
            <div class="q-pa-md text-subtitle2 os-semibold text-white">
              Hechos y eventos históricos que tiene lugar hoy. Artículos que
              relatan los momentos más importantes de la historia, como el
              Movimiento.
            </div>
          </div>
          <!-- <event-row />
          <event-row />
          <event-row /> -->
        </q-tab-panel>
        <q-tab-panel name="categories" class="q-pa-none">
          categories
        </q-tab-panel>
        <q-tab-panel name="promoter" class="q-pa-none">
          promoter
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      search: null,
      tab: "events",
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>
