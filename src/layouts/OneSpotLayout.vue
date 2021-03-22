<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view
        v-if="activeUser.emailVerification && activeUser.completeRegistration"
      />
      <div
        class="row fixed-bottom bg-grey-2 q-py-sm"
        v-if="!$route.fullPath.includes('/event/')"
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
            <q-btn
              flat
              round
              dense
              icon="perm_identity"
              color="black"
              @click="logoutUser()"
            />
          </div>
        </div>
      </div>
      <CompleteRegistrationOverlayComponent :userData="activeUser" />
      <!-- BOTTOM SPACE -->
      <div
        class="row"
        style="height: 50px"
        v-if="!$route.fullPath.includes('/event/')"
      />
      <!-- /BOTTOM SPACE -->
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CompleteRegistrationOverlayComponent from "@/components/CompleteRegistrationOverlayComponent";

export default {
  data() {
    return {
      completeRegistrationDialog: true,
    };
  },
  methods: {
    ...mapActions("authStore", ["logoutUser", "getUserData"]),
  },
  computed: {
    ...mapState("authStore", ["activeUser"]),
  },
  mounted() {
    this.getUserData();
  },
  components: {
    CompleteRegistrationOverlayComponent,
  },
};
</script>
