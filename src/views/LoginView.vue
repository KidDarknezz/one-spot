<template>
  <q-page>
    <div class="row flex flex-center" style="height: 100vh">
      <q-space />
      <div class="col-xs-9">
        <div class="row q-mb-xl">
          <q-space />
          <div class="text-h4">one<br />spot</div>
          <q-space />
        </div>
        <div class="row q-mb-md">
          <q-input
            label="Email Address"
            filled
            color="black"
            dense
            class="full-width"
            v-model="loginData.email"
          />
        </div>
        <div class="row q-mb-md">
          <q-input
            type="password"
            label="Password"
            filled
            color="black"
            dense
            class="full-width"
            v-model="loginData.password"
          />
        </div>
        <div class="row q-mb-md">
          <q-btn
            color="pink"
            rounded
            push
            class="full-width"
            @click="loginUser(loginData)"
          >
            <template v-if="!loadingStatus"> Login </template>
            <q-spinner-dots color="white" size="1em" v-else />
          </q-btn>
        </div>
        <div class="row q-mb-lg">
          <router-link to="/login" class="text-grey-7 text-center full-width">
            Forgot password
          </router-link>
        </div>
        <div class="row">
          <router-link to="/login" class="text-grey-7 text-center full-width">
            Register here
          </router-link>
        </div>
      </div>
      <q-space />
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      loginData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions("authStore", ["loginUser"]),
  },
  computed: {
    ...mapState("authStore", ["loadingStatus"]),
  },
};
</script>