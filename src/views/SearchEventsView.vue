<template>
  <q-page class="q-pa-lg">
    <q-input label="Buscar" color="black" filled ref="search" />
  </q-page>
</template>

<script>
export default {
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
