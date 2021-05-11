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

        <q-tab-panel name="notifications" class="q-pa-none">
          <q-list separator>
            <q-slide-item
              @left="onLeft"
              @right="onRight"
              left-color="red-7"
              right-color="os-pink"
            >
              <template v-slot:left>
                Eliminar. <q-icon name="close" />
              </template>
              <template v-slot:right>
                <div class="row items-center">
                  Marcar como leido.<q-icon right name="check" />
                </div>
              </template>

              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/avatar.png" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <div class="text-caption os-semibold">SHOW PRO PANAMA</div>
                  <div class="text-subtitle2 os-bold">
                    MARC ANTHONY EN PANAMÁ
                  </div>
                  <div class="text-caption">
                    50% de descuento en tu compra usando tu Visa y Mastercard.
                  </div>
                </q-item-section>
                <q-item-section avatar>
                  <q-icon color="os-grey-medium" name="chevron_left" />
                </q-item-section>
              </q-item>
            </q-slide-item>
          </q-list>
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
  methods: {
    onLeft({ reset }) {
      alert("Left action triggered. Resetting in 1 second.");
      this.finalize(reset);
    },

    onRight({ reset }) {
      alert("Right action triggered. Resetting in 1 second.");
      this.finalize(reset);
    },

    finalize(reset) {
      this.timer = setTimeout(() => {
        reset();
      }, 1000);
    },
  },

  beforeDestroy() {
    clearTimeout(this.timer);
  },
};
</script>
