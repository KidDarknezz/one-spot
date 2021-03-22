<template>
  <q-page>
    <div class="row q-pa-lg">
      <q-btn icon="navigate_before" flat round size="sm" to="/login" />
    </div>
    <div class="row">
      <q-card class="full-width absolute-center q-px-lg" flat>
        <q-card-section>
          <q-input
            label="Nombre"
            color="pink"
            filled
            class="q-mb-md"
            v-model="registerForm.name"
          />
          <q-input
            label="Apellido"
            color="pink"
            filled
            class="q-mb-md"
            v-model="registerForm.lastName"
          />
          <q-input
            label="Correo electronico"
            color="pink"
            filled
            class="q-mb-md"
            v-model="registerForm.email"
          />
          <q-input
            label="Contraseña"
            type="password"
            color="pink"
            filled
            class="q-mb-md"
            v-model="registerForm.password"
          />
          <q-input
            label="Confirmar contraseña"
            type="password"
            color="pink"
            filled
            class="q-mb-md"
            v-model="registerForm.rePassword"
          />
        </q-card-section>
        <q-card-actions>
          <q-btn
            class="full-width"
            color="pink"
            push
            @click="registerUser(registerForm)"
          >
            <template v-if="!loadingStatus"> Registrar </template>
            <q-spinner-dots color="white" size="1em" v-else />
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      registerForm: {
        name: "",
        lastName: "",
        email: "",
        password: "",
        rePassword: "",
      },
    };
  },
  methods: {
    ...mapActions("authStore", ["registerUser"]),
  },
  computed: {
    ...mapState("authStore", ["loadingStatus"]),
  },
};
</script>
