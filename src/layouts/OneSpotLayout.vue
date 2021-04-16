<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view
        v-if="
          activeUser &&
            activeUser.emailVerification &&
            activeUser.completeRegistration
        "
      />
      <div
        :class="
          checkIfIphone
            ? 'row fixed-bottom bg-grey-2 q-pb-lg q-pt-sm'
            : 'row fixed-bottom bg-grey-2 q-py-sm'
        "
        v-if="!$route.fullPath.includes('/event/')"
      >
        <div class="col">
          <div class="justify-center row">
            <q-btn flat round dense icon="o_home" color="black" to="/" />
          </div>
        </div>
        <div class="col">
          <div class="justify-center row">
            <q-btn flat round dense icon="chat_bubble_outline" color="black" />
          </div>
        </div>
        <div class="col">
          <div class="justify-center row">
            <q-btn flat round dense icon="favorite_border" color="black" />
          </div>
        </div>
        <div class="col">
          <div class="justify-center row">
            <q-btn
              flat
              round
              dense
              icon="o_location_on"
              color="black"
              to="/nearby"
            />
          </div>
        </div>
        <div class="col">
          <div class="justify-center row">
            <q-btn flat round dense color="black" @click="logoutUser()">
              <q-avatar size="24px" v-if="activeUser && activeUser.profilePic">
                <img :src="activeUser.profilePic" />
              </q-avatar>
              <q-icon name="o_account_circle" v-else />
            </q-btn>
          </div>
        </div>
      </div>
      <CompleteRegistrationOverlayComponent
        :userData="activeUser"
        :display="displayCompleteRegistrationDialog"
      />
      <!-- BOTTOM SPACE -->
      <div
        class="row"
        style="height: 50px"
        v-if="!$route.fullPath.includes('/event/')"
      />
      <!-- /BOTTOM SPACE -->
    </q-page-container>
    <LoadingOverlayComponent :display="displayLoading" />
  </q-layout>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CompleteRegistrationOverlayComponent from "@/components/CompleteRegistrationOverlayComponent";
import LoadingOverlayComponent from "@/components/LoadingOverlayComponent";
import { Platform } from "quasar";

export default {
  data() {
    return {
      displayLoading: true,
    };
  },
  methods: {
    ...mapActions("authStore", ["logoutUser", "getUserData"]),
  },
  computed: {
    ...mapState("authStore", ["activeUser"]),

    checkIfIphone() {
      return Platform.is.iphone;
    },

    displayCompleteRegistrationDialog() {
      try {
        if (
          !this.activeUser.emailVerification ||
          !this.activeUser.completeRegistration
        )
          return true;
        else return false;
      } catch (err) {
        console.log(err);
      }
    },
  },
  beforeMount() {
    this.getUserData();
  },
  mounted() {
    setTimeout(() => {
      this.displayLoading = false;
    }, 2000);
    console.log(Platform.is.iphone);
  },
  components: {
    CompleteRegistrationOverlayComponent,
    LoadingOverlayComponent,
  },
};
</script>
