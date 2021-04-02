<template>
  <q-page>
    <div class="row">
      <div class="col-lg-6">
        <q-form @submit="createManagerAccount(newAccount)">
          <q-input
            label="Empresa"
            filled
            color="pink"
            v-model="newAccount.businessName"
          />
          <q-input
            label="Correo"
            filled
            color="pink"
            v-model="newAccount.email"
          />
          <q-input
            label="Contraseña"
            type="password"
            filled
            color="pink"
            v-model="newAccount.password"
          />
          <q-btn label="Enviar" type="submit" />
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
        businessName: "showpro",
        email: "showpro@gmail.com",
        password: "123456",
        type: "client",
      },
    };
  },
  methods: {
    ...mapActions("dashboardStore", ["createManagerAccount"]),
  },
};
</script>
