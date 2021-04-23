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
              <animation-component
                :animation="'new-animation'"
                :size="'105%'"
              />
              <!-- <img src="@/assets/splash_logo.png" style="width: 100%" /> -->
            </div>
            <q-space />
          </div>
        </div>
        <q-space />
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: ["display"],
};
</script>
