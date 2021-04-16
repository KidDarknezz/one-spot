<template>
  <q-page class="q-pa-lg">
    <q-input
      label="Buscar"
      color="black"
      filled
      ref="search"
      class="q-px-md"
      v-model="searchText"
    />
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
