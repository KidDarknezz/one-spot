<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="bg-black text-white">
        <q-btn flat round dense icon="menu" @click="left = !left" />
        <q-toolbar-title class="os-semibold">
          OneSpot Dashboard
        </q-toolbar-title>
        <q-btn flat round dense icon="sim_card" class="q-mr-xs" />
        <q-btn flat round dense icon="gamepad" />
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="left"
      side="left"
      content-class="bg-grey-2"
    >
      <!-- drawer content -->
      <q-list>
        <q-item clickable v-ripple to="/dashboard">
          <q-item-section avatar>
            <q-icon color="black" name="event" />
          </q-item-section>
          <q-item-section class="text-black">Mis Eventos</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      left: false,
    };
  },
};
</script>
