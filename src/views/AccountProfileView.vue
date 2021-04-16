<template>
  <q-page class="q-pa-lg">
    <div class="row q-px-md">
      <div class="col-xs-4">
        <q-avatar size="75px">
          <img :src="activeUser.profilePic" />
        </q-avatar>
      </div>
      <div class="col">
        <div class="row">
          <div class="text-subtitle2 os-semibold text-grey-7">
            {{ activeUser.name }} {{ activeUser.lastName }}
          </div>
        </div>
        <div class="row">
          <div class="col text-center">
            <div class="text-subtitle2">
              14<br /><span class="os-semibold">Likes</span>
            </div>
          </div>
          <div class="col text-center">
            <div class="text-subtitle2">
              24<br /><span class="os-semibold">Following</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-caption text-center">{{ activeUser.email }}</div>
    <div class="row q-px-md">
      <div
        class="col-xs-4 q-pa-xs"
        v-for="interest in activeUser.interests"
        :key="interest"
      >
        <div class="os-cat-cta ">
          {{ categoryName(interest) }}
        </div>
      </div>
    </div>
    <div class="row q-px-md">
      <q-btn
        flat
        label="Editar tags"
        class="full-width"
        rounded
        size="sm"
        color="grey-7"
        no-caps
      />
    </div>
    <div class="text-subtitle2 os-semibold text-center">Tu cuenta</div>
    <div class="row q-px-md">
      <q-btn
        label="Editar cuenta"
        class="full-width os-semibold"
        rounded
        color="pink"
        no-caps
        unelevated
      />
    </div>
    <div class="row q-px-md">
      <q-btn
        label="Cerrar sesion"
        class="full-width os-semibold"
        rounded
        outline
        color="black"
        no-caps
        unelevated
        @click="logoutUser()"
      />
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import categoriesMixin from "@/mixins/categoriesMixin";

export default {
  methods: {
    ...mapActions("authStore", ["logoutUser"]),
  },
  mixins: [categoriesMixin],
  computed: {
    ...mapState("authStore", ["activeUser"]),
  },
};
</script>
