<template>
  <q-dialog
    maximized
    v-model="display"
    transition-show="fade"
    transition-hide="fade"
    persistent
  >
    <q-card v-if="!this.userData.emailVerification">
      <q-card-section>
        <div class="text-subtitle2">Email verification</div>
      </q-card-section>
      <q-card-actions>
        <q-btn
          label="TEXT"
          color="pink"
          class="full-width"
          @click="controlEmailVerification()"
        />
      </q-card-actions>
    </q-card>
    <template v-else>
      <q-card v-if="registrationStep == 0">
        <q-card-actions>
          <q-btn label="b" round flat @click="logoutUser()" />
        </q-card-actions>
        <q-card-section>
          insert profile pic here
        </q-card-section>
        <q-card-actions>
          <q-btn
            label="TEXT"
            color="pink"
            class="full-width"
            @click="registrationStep++"
          />
        </q-card-actions>
      </q-card>
      <q-card v-if="registrationStep == 1">
        <q-card-actions>
          <q-btn label="b" round flat @click="registrationStep--" />
        </q-card-actions>
        <q-card-section>
          Select likes here
        </q-card-section>
        <q-card-actions>
          <q-btn
            label="TEXT"
            color="pink"
            class="full-width"
            @click="completeUserRegistration()"
          />
        </q-card-actions>
      </q-card>
    </template>
  </q-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["userData", "display"],

  data() {
    return {
      registrationStep: 0,
    };
  },
  methods: {
    ...mapActions("authStore", ["completeUserRegistration", "logoutUser"]),

    controlEmailVerification() {
      if (!this.userData.emailVerification) this.logoutUser();
      else {
        console.log("continue with registration");
        this.registrationStep++;
      }
    },
  },
};
</script>
