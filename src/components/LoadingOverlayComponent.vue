<template>
  <q-dialog
    v-model="display"
    persistent
    maximized
    transition-show="fade"
    transition-hide="fade"
  >
    <q-card class="bg-pink">
      <div class="row flex flex-center" style="height: 100vh">
        <q-space />
        <div class="col-xs-9">
          <div class="row q-mb-lg">
            <q-space />
            <div class="col-lg-1 col-md-1 col-sm-2 col-xs-5">
              <div id="animation"></div>
              <img src="@/assets/splash_logo.png" style="width: 100%" />
            </div>
            <q-space />
          </div>
          <div class="row">
            <q-space />
            <q-spinner-dots color="white" size="3em" />
            <q-space />
          </div>
        </div>
        <q-space />
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import lottie from "lottie-web";

export default {
  props: ["display"],
  mounted() {
    let el = document.getElementById("animation");
    console.log(el);
    lottie.loadAnimation({
      container: el, // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("@/assets/new-animation.json"), // the path to the animation json
    });
  },
};
</script>
