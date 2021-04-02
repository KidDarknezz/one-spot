<template>
  <q-page class="q-pa-lg">
    <div class="row q-mb-xl">
      <div class="text-h5 os-semibold">
        Clientes
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8 q-px-sm">
        <q-table
          title="Cuentas de clientes"
          :data="clientsAccounts"
          :columns="columns"
          row-key="name"
          flat
          class="bg-grey-2"
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width />
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td auto-width>
                <!-- <img
                  src="https://lh3.googleusercontent.com/proxy/RAYNXbmozflmUnN01TFP-wIsEYhBmelKJqD723Slpv-A__HjmxwJMNtJwhTwD62-X0wksSNqXb6S5HrLAGZUCDujKI3fBkc6ck3BCFctXQRrSGvkvqZ9wk8Z7sjysO8"
                  width="60px;"
                  style=""
                /> -->
                <q-avatar>
                  <img
                    src="http://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,f_auto,h_3000,q_90,w_1200/81906/B-0hcmTXEAECuwS_fdfnve.jpg"
                  />
                </q-avatar>
              </q-td>
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.value }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
      <div class="col-lg-4 q-px-sm">
        <q-form @submit="createManagerAccount(newAccount)">
          <q-card flat class="bg-grey-2">
            <q-card-section>
              <div class="text-subtitle2 os-semibold">
                Crear nueva cuenta de cliente
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
        type: "client",
      },
      columns: [
        {
          name: "name",
          align: "center",
          label: "Cliente",
          field: "name",
          sortable: true,
        },
        {
          name: "email",
          align: "center",
          label: "Correo",
          field: "email",
          sortable: true,
        },
        {
          name: "createdAt",
          align: "center",
          label: "Creado el",
          field: "createdAt",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    ...mapActions("dashboardStore", [
      "createManagerAccount",
      "getClientsAccounts",
    ]),
  },
  computed: {
    ...mapState("dashboardStore", ["clientsAccounts"]),
  },
  mounted() {
    this.getClientsAccounts();
  },
};
</script>
