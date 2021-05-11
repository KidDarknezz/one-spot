<template>
  <q-page class="q-py-lg">
    <q-input
      label="Buscar"
      color="black"
      filled
      ref="search"
      class="q-px-md q-mb-md"
      v-model="searchText"
    />
    <div class="row q-px-md q-mb-md">
      <div class="col-xs-3 q-px-xs">
        <div class="os-cat-cta">
          Musica
        </div>
      </div>
      <div class="col-xs-3 q-px-xs">
        <div class="os-cat-cta">
          Musica
        </div>
      </div>
      <div class="col-xs-3 q-px-xs">
        <div class="os-cat-cta">
          Musica
        </div>
      </div>
      <div class="col-xs-3 q-px-xs">
        <div class="os-cat-cta">
          Musica
        </div>
      </div>
    </div>
    <q-separator color="black" />
    <div class="text-subtitle2 os-semibold q-pa-md">
      Recomendaciones
    </div>
    <event-row />
    <event-row />
    <event-row />
    <event-row />
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    focusInput() {
      this.$refs.search.focus();
    },
  },
  mounted() {
    this.focusInput();
  },
};
</script>
