<template>
  <q-page>
    <div class="row fixed-top q-pa-md" style="z-index: 1" id="search-box">
      <div class="bg-grey-2 full-width text-center q-pa-md text-bold os-search">
        <q-icon name="fas fa-search" class="text-accent q-mr-xs" />
        Eventos
      </div>
    </div>
    <q-img :src="require('@/assets/hero.webp')" class="text-white text-bold">
      <span class="absolute-full text-h4 flex flex-center">One<br />Spot</span>
    </q-img>
  </q-page>
</template>


<script>
export default {
  mounted() {
    const searchbox = document.querySelector("#search-box");
    window.addEventListener("scroll", () => {
      let scroll = (window.scrollY || window.pageYOffset) / 150;
      searchbox.style.backgroundColor = `rgba(255, 255, 255, ${scroll})`;
      searchbox.style.boxShadow = `0 1px 5px 0px rgba(156, 156, 156, ${scroll})`;
    });
  },
};
</script>

<style>
.os-search {
  border-radius: 30px;
}
</style>