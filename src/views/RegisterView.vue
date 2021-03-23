<template>
  <q-page>
    <div class="row q-pa-lg">
      <q-btn icon="navigate_before" flat round size="sm" to="/login" />
    </div>
    <div class="row">
      <q-form
        class="absolute-center full-width q-px-lg"
        @submit="registerUser(registerForm)"
      >
        <q-card flat>
          <q-card-section>
            <q-input
              label="Nombre"
              color="pink"
              filled
              class="q-mb-md"
              v-model="registerForm.name"
              :rules="[(val) => !!val || 'Debes llenar este campo.']"
            />
            <q-input
              label="Apellido"
              color="pink"
              filled
              class="q-mb-md"
              v-model="registerForm.lastName"
              :rules="[(val) => !!val || 'Debes llenar este campo.']"
            />
            <q-input
              label="Correo electronico"
              color="pink"
              filled
              class="q-mb-md"
              v-model="registerForm.email"
              :rules="[
                (val) => val.length > 0 || 'Debes llenar este campo.',
                (val) => validEmail.test(val) || 'Formato de correo incorrecto',
              ]"
            />
            <q-input
              label="Contraseña"
              type="password"
              color="pink"
              filled
              class="q-mb-md"
              v-model="registerForm.password"
              :rules="[
                (val) => !!val || 'Debes llenar este campo.',
                (val) =>
                  val.length >= 6 ||
                  'Debes ingresar por lo menos 6 caracteres.',
              ]"
            />
            <q-input
              label="Confirmar contraseña"
              type="password"
              color="pink"
              filled
              class="q-mb-md"
              v-model="registerForm.rePassword"
              :rules="[
                (val) => val.length > 0 || 'El campo es obligatorio',
                (val) =>
                  val == registerForm.password ||
                  'Las contraseñas no coinciden',
              ]"
            />
          </q-card-section>
          <q-card-actions>
            <q-btn class="full-width" color="pink" push type="submit">
              <template v-if="!loadingStatus"> Registrar </template>
              <q-spinner-dots color="white" size="1em" v-else />
            </q-btn>
          </q-card-actions>
        </q-card>
      </q-form>
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
      validEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
