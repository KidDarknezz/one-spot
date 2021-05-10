<template>
  <div id="os-animation" :style="{ width: size }" />
</template>

<script>
import lottie from "lottie-web";

export default {
  props: ["animation", "size", "loop"],
  mounted() {
    var loop = true;
    if (this.loop != undefined) {
      loop = this.loop;
    }
    let el = document.getElementById("os-animation");
    lottie.loadAnimation({
      container: el,
      renderer: "svg",
      loop: loop,
      autoplay: true,
      animationData: require(`@/assets/${this.animation}.json`),
    });
  },
};
</script>
