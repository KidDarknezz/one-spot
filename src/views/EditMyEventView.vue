<template>
  <q-page class="q-pa-lg">
    <div class="row q-mb-xl">
      <q-btn
        label="Regresar"
        no-caps
        rounded
        icon="arrow_back"
        flat
        dense
        size="sm"
        color="black"
        unelevated
        class="os-semibold q-mr-lg"
        @click="$router.go(-1)"
      />
      <div class="text-h5 os-semibold">
        Event name
      </div>
    </div>
  </q-page>
</template>
