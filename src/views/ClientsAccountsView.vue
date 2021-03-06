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
                <q-avatar
                  v-if="props.row.profile || props.row.profile != 'img'"
                >
                  <img :src="props.row.profile" />
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
        <q-form
          @submit="
            createManagerAccount(newAccount);
            newAccountDialog = true;
          "
        >
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
                class="q-mb-md"
              />
              <q-file
                v-model="newAccount.profile"
                label="Adjuntar profile"
                filled
                color="pink"
                :rules="[(val) => !!val || 'Este campo es requerido']"
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
                <template v-slot:hint>
                  50 x 50 (px)
                </template>
              </q-file>
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
    <q-dialog v-model="newAccountDialog" persistent>
      <q-card flat>
        <q-card-section>
          <div class="text-h6 os-font os-semibold">Enviado</div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle2 os-font">
            La creacion de cuenta ha sido enviada al servidor<br />Regresa en
            unos <strong>5 minutos</strong> mientras es procesada.
          </div>
        </q-card-section>
        <q-card-actions>
          <q-space />
          <q-btn
            label="Aceptar"
            no-caps
            flat
            rounded
            color="pink"
            class="os-font os-semibold"
            @click="emptyForm()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import firebase from "firebase/app";
import "firebase/storage";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      newAccountDialog: false,
      newAccount: {
        name: "",
        email: "",
        password: "",
        type: "client",
        profile: null,
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

    emptyForm() {
      this.newAccount = {
        name: "",
        email: "",
        password: "",
        type: "client",
        profile: null,
      };
      this.newAccountDialog = false;
    },
  },
  computed: {
    ...mapState("dashboardStore", ["clientsAccounts"]),
  },
  mounted() {
    this.getClientsAccounts();
  },
};
</script>
