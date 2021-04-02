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
      data: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: "8%",
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: "6%",
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: "3%",
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: "7%",
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: "0%",
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: "0%",
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: "0%",
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: "2%",
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: "12%",
          iron: "6%",
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
