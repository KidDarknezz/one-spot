<template>
  <q-dialog
    maximized
    v-model="display"
    transition-show="fade"
    transition-hide="fade"
    persistent
    class="os-font"
  >
    <q-card v-if="userData && !userData.emailVerification">
      <div class="full-width absolute-center q-px-lg">
        <q-card-section>
          <div class="text-subtitle2 text-center">
            Te hemos enviado un correo de verificacion a tu direccion de correo:
            {{ userData.email }}
          </div>
        </q-card-section>
        <q-card-actions>
          <q-btn
            :label="userData.emailVerification ? 'Continuar' : 'Inicio'"
            color="pink"
            class="full-width"
            push
            @click="controlEmailVerification()"
          />
        </q-card-actions>
      </div>
    </q-card>
    <template v-else>
      <q-card v-if="registrationStep == 0">
        <q-card-actions class="q-pa-lg">
          <q-btn icon="navigate_before" round flat @click="logoutUser()" />
        </q-card-actions>
        <div class="full-width absolute-center q-px-lg">
          <q-card-section>
            <div class="row q-mb-md">
              <q-icon name="photo_camera" size="xl" class="full-width" />
            </div>
            <div class="row q-mb-sm">
              <div class="text-h5 text-center full-width">
                Foto de perfil
              </div>
            </div>
            <div class="row q-mb-lg">
              <div class="text-subtitle2 text-center full-width text-grey-7">
                Agregar una foto de perfil para que tus amigos sepan que eres
                tu.
              </div>
            </div>
            <div class="row">
              <q-file
                filled
                v-model="profile"
                color="black"
                :rules="[
                  (val) =>
                    validateProfilePicExtension(val) ||
                    'Este formato de archivo no es permitido.',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
            </div>
          </q-card-section>
          <q-card-actions>
            <q-btn
              label="Continuar"
              color="pink"
              class="full-width q-mb-md"
              push
              @click="registrationStep++"
              v-if="profile"
              :disable="!validateProfilePicExtension(profile)"
            />
            <q-btn
              label="Skip"
              flat
              class="full-width"
              color="grey-7"
              no-caps
              @click="skipProfilePic()"
            />
          </q-card-actions>
        </div>
      </q-card>
      <q-card v-if="registrationStep == 1">
        <q-card-actions class="q-pa-lg">
          <q-btn
            icon="navigate_before"
            round
            flat
            @click="registrationStep--"
          />
        </q-card-actions>
        <div class="absolute-center full-width q-px-lg">
          <q-card-section>
            <div class="row">
              <div class="text-h5 text-bold os-font">Categorias</div>
            </div>
            <div class="row q-mb-md">
              <div class="text-subtitle2 os-font">
                Selecciones personalizadas para tu home.
              </div>
            </div>
            <div class="row q-mb-md">
              <div class="text-subtitle2 text-grey-7 text-center full-width">
                {{ selected.length }}/5
              </div>
            </div>
            <div class="row" style="height: 50vh; overflow-y: scroll">
              <div
                class="col-xs-4 q-pa-xs"
                v-for="cat in allEventCategories"
                :key="cat.value"
              >
                <div
                  :class="
                    selected.includes(cat.value)
                      ? 'os-cat-cta-selected'
                      : 'os-cat-cta'
                  "
                  @click="addRemoveCategoryToList(cat.value)"
                >
                  {{ cat.label }}
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-actions>
            <q-btn
              color="pink os-font os-semibold"
              class="full-width"
              push
              @click="submitCompleteRegistration()"
              :disable="loadingStatus"
            >
              <template v-if="!loadingStatus"> Finalizar </template>
              <q-spinner-dots color="white" size="1em" v-else />
            </q-btn>
          </q-card-actions>
        </div>
      </q-card>
    </template>
  </q-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
import categoriesMixin from "@/mixins/categoriesMixin";

export default {
  props: {
    userData: {
      type: Object,
      default: () => {
        return {
          emailVerification: false,
        };
      },
    },
    display: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      registrationStep: 0,
      profile: null,
      selected: [],
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
    validateProfilePicExtension(file) {
      const validExtensions = ["jpg", "jpeg", "png", "gif"];
      if (!file) return false;
      const extension = file.name.split(".")[1];
      if (validExtensions.includes(extension)) return true;
      else return false;
    },
    skipProfilePic() {
      this.profile = null;
      this.registrationStep++;
    },
    addRemoveCategoryToList(cat) {
      if (!this.selected.includes(cat)) {
        if (this.selected.length == 5) {
          alert("Solo puedes elegir 5 categorias.");
          return;
        }
        this.selected.push(cat);
      } else {
        for (let i = 0; i <= this.selected.length; i++) {
          if (this.selected[i] == cat) this.selected.splice(i, 1);
        }
      }
    },
    submitCompleteRegistration() {
      if (this.selected.length == 0) {
        alert("Debes elegir por lo menos una categoria.");
        return;
      }
      this.completeUserRegistration({
        profilePic: this.profile,
        selectedCategories: this.selected,
      });
    },
  },
  mixins: [categoriesMixin],
  computed: {
    ...mapState("authStore", ["loadingStatus"]),
  },
};
</script>
