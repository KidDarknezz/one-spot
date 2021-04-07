<template>
  <q-page class="q-pa-lg">
    <div class="row q-mb-xl">
      <div class="text-h5 os-semibold">
        Administradores
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8 q-px-sm">
        <q-table
          title="Cuentas de administradores"
          :data="adminsAccounts"
          :columns="columns"
          row-key="name"
          flat
          class="bg-grey-2"
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
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
                Crear nueva cuenta de administrador
              </div>
            </q-card-section>
            <q-card-section>
              <q-input
                label="Nombre completo"
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
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      newAccountDialog: false,
      newAccount: {
        name: "",
        email: "",
        password: "",
        type: "admin",
      },
      columns: [
        {
          name: "name",
          align: "center",
          label: "Nombre",
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
      "getAdminsAccounts",
    ]),

    emptyForm() {
      this.newAccount = {
        name: "",
        email: "",
        password: "",
        type: "admin",
      };
      this.newAccountDialog = false;
    },
  },
  computed: {
    ...mapState("dashboardStore", ["adminsAccounts"]),
  },
  mounted() {
    this.getAdminsAccounts();
  },
};
</script>
