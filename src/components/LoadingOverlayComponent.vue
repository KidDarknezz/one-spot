<template>
  <q-dialog
    v-model="display"
    persistent
    maximized
    transition-show="fade"
    transition-hide="fade"
  >
    <q-card class="bg-white">
      <div class="row flex flex-center" style="height: 100vh">
        <q-space />
        <div class="col-xs-9">
          <div class="row q-mb-lg">
            <q-space />
            <div class="text-h4">one<br />spot</div>
            <q-space />
          </div>
          <div class="row">
            <q-space />
            <q-spinner-dots color="black" size="3em" />
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