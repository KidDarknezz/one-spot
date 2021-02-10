<template >
  <q-layout view="lHh Lpr lFf" id="app">
    <q-page-container>
      <router-view />
      <div
        class="row fixed-bottom bg-grey-2 q-py-sm"
        v-if="!$route.fullPath.includes('selected-assignature')"
      >
        <div class="col">
          <div class="justify-center row">
            <q-btn flat round dense icon="o_home" color="black" />
          </div>
        </div>
        <div class="col">
          <div class="justify-center row">
            <q-btn flat round dense icon="grid_view" color="black" />
          </div>
        </div>
        <div class="col">
          <div class="justify-center row">
            <q-btn flat round dense icon="favorite_border" color="black" />
          </div>
        </div>
        <div class="col">
          <div class="justify-center row">
            <q-btn flat round dense icon="o_location_on" color="black" />
          </div>
        </div>
        <div class="col">
          <div class="justify-center row">
            <q-btn flat round dense icon="perm_identity" color="black" />
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<style>
#app {
  font-family: "Poppins", sans-serif;
}

.os-font {
  font-family: "Poppins", sans-serif;
}
</style>