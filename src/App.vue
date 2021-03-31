<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Poppins", sans-serif;
}

.os-font {
  font-family: "Poppins", sans-serif;
}
.os-bold {
  font-weight: 700;
}
.os-semibold {
  font-weight: 600 !important;
}
.os-rounded-border {
  border-radius: 20px !important;
}
.os-cat-cta {
  border: solid 1px black;
  border-radius: 10px;
  padding: 5px;
  text-align: center;
  font-family: "Poppins", sans-serif;
  font-size: 12px;
}
.os-cat-cta-selected {
  border: solid 1px #e91e63;
  background-color: #e91e63;
  border-radius: 10px;
  padding: 5px;
  text-align: center;
  color: white;
  font-family: "Poppins", sans-serif;
  font-size: 12px;
}
</style>
