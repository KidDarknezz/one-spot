<template>
  <q-page v-if="activeUser">
    email validation
    <q-btn push color="pink" :disable="!activeUser.emailVerification" to="/">
      <template v-if="activeUser.emailVerification">Continuar</template>
      <template v-else>Pendiente</template>
    </q-btn>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("authStore", ["activeUser"]),
  },
};
</script>
