<template>
  <q-page class="q-pa-lg">
    <div class="row q-mb-xl">
      <div class="text-h5 os-semibold">
        Administradores
      </div>
    </div>
    <div class="row">
      <q-space />
      <div class="col-lg-4">
        <q-form @submit="createManagerAccount(newAccount)">
          <q-card flat class="bg-grey-2">
            <q-card-section>
              <div class="text-subtitle2 os-semibold">
                Crear nueva cuenta de administrador
              </div>
            </q-card-section>
            <q-card-section>
              <q-input
                label="Empresa"
                filled
                color="pink"
                v-model="newAccount.name"
                :rules="[(val) => !!val || 'Este campo es requerido']"
                class="q-mb-md"
              />
              <q-input
                label="Correo"
                filled
                color="pink"
                v-model="newAccount.email"
                :rules="[(val) => !!val || 'Este campo es requerido']"
                class="q-mb-md"
              />
              <q-input
                label="Contraseña"
                type="password"
                filled
                color="pink"
                v-model="newAccount.password"
                :rules="[(val) => !!val || 'Este campo es requerido']"
              />
            </q-card-section>
            <q-card-actions class="q-px-md">
              <q-space />
              <q-btn
                label="Crear"
                type="submit"
                flat
                class="os-semibold"
                color="pink"
                dense
                rounded
                size="sm"
              />
            </q-card-actions>
          </q-card>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      newAccount: {
        name: "",
        email: "",
        password: "",
        type: "admin",
      },
    };
  },
  methods: {
    ...mapActions("dashboardStore", ["createManagerAccount"]),
  },
};
</script>
