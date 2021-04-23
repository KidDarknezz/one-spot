<template>
  <div id="os-animation" :style="{ width: size }" />
</template>

<script>
import lottie from "lottie-web";

export default {
  props: ["animation", "size"],
  mounted() {
    let el = document.getElementById("os-animation");
    lottie.loadAnimation({
      container: el,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require(`@/assets/${this.animation}.json`),
    });
  },
};
</script>
