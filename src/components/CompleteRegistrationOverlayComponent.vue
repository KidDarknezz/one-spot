<template>
  <q-dialog
    v-model="displayRegistrationDialog"
    maximized
    transition-show="fade"
    transition-hide="fade"
  >
    <q-card v-if="registrationStep == 0">
      <q-card-section>
        <q-btn icon="navigate_before" flat round size="sm" to="/login" />
      </q-card-section>
      <q-card-section class="absolute-center full-width">
        <div class="text-subtitle2 text-center q-mb-lg">
          Hemos enviado un correo de verificacion a tu direccion:
          {{ userData.email }}
        </div>
        <q-btn
          color="pink"
          :label="!userData.emailVerification ? 'Verificando...' : 'Continuar'"
          :disable="!userData.emailVerification"
          class="full-width"
          @click="registrationStep++"
          push
        />
      </q-card-section>
    </q-card>
    <q-card v-if="registrationStep == 1">
      <q-card-section>
        <div class="text-subtitle2 q-mb-lg">
          Upload profile photo will go here
        </div>
        <q-btn
          color="pink"
          label="Continuar"
          class="full-width"
          @click="registrationStep++"
          push
        />
      </q-card-section>
    </q-card>
    <q-card v-if="registrationStep == 2">
      <q-card-section>
        <div class="text-subtitle2 q-mb-lg">
          Event interests will go here
        </div>
        <q-btn
          color="pink"
          label="Finalizar"
          class="full-width"
          @click="completeUserRegistration()"
          push
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["userData"],

  data() {
    return {
      registrationStep: 0,
    };
  },
  methods: {
    ...mapActions("authStore", ["completeUserRegistration"]),
  },
  computed: {
    displayRegistrationDialog() {
      if (
        !this.userData.emailVerification ||
        !this.userData.completeRegistration
      )
        return true;
      else return false;
    },
  },
  mounted() {
    if (this.userData.emailVerification == true) this.registrationStep = 1;
  },
};
</script>
