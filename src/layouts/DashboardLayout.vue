<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="bg-black text-white">
        <q-btn flat round dense icon="menu" @click="left = !left" />
        <q-toolbar-title class="os-semibold">
          OneSpot Dashboard
        </q-toolbar-title>
        <q-btn flat round dense icon="logout" @click="logoutUser()" />
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
        <q-item
          clickable
          v-ripple
          to="/dashboard"
          v-if="activeUser && activeUser.role == 'client'"
        >
          <q-item-section avatar>
            <q-icon color="black" name="event" />
          </q-item-section>
          <q-item-section class="text-black">Mis Eventos</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          to="/clients-accounts"
          v-if="activeUser && activeUser.role == 'admin'"
        >
          <q-item-section avatar>
            <q-icon color="black" name="supervised_user_circle" />
          </q-item-section>
          <q-item-section class="text-black">Clientes</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          to="/admins-accounts"
          v-if="activeUser && activeUser.role == 'admin'"
        >
          <q-item-section avatar>
            <q-icon color="black" name="manage_accounts" />
          </q-item-section>
          <q-item-section class="text-black">Administradores</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
      <loading-overlay :display="loadingStatus" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      left: false,
    };
  },
  methods: {
    ...mapActions("authStore", ["getUserData", "logoutUser"]),
  },
  computed: {
    ...mapState("dashboardStore", ["loadingStatus"]),
    ...mapState("authStore", ["activeUser"]),
  },
  beforeMount() {
    this.getUserData();
  },
};
</script>
