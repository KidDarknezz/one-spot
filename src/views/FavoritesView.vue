<template>
  <q-page>
    <q-card flat>
      <q-tabs
        v-model="tab"
        dense
        class="text-black"
        active-color="os-pink"
        indicator-color="os-pink"
        align="justify"
      >
        <q-tab name="favorites" label="Favoritos" no-caps class="q-py-sm" />
        <q-tab
          name="notifications"
          label="Notificaciones"
          no-caps
          class="q-py-sm"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated swipeable>
        <q-tab-panel name="favorites" class="q-px-none">
          <event-row />
          <event-row />
          <event-row />
        </q-tab-panel>

        <q-tab-panel name="notifications">
          Notifications will go here
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      tab: "favorites",
    };
  },
};
</script>
