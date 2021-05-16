<template>
  <q-page>
    <div class="bg-grey-3">
      <div class="row q-pa-md q-mb-md">
        <q-btn
          icon="navigate_before"
          flat
          round
          color="os-grey-medium"
          to="/browse?tab=promoter"
        />
        <q-space />
        <q-btn icon="more_horiz" flat round color="os-grey-medium" />
      </div>
      <div class="row q-mb-xl">
        <q-avatar size="90px" class="q-px-md">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
        <div class="q-pl-xl">
          <div class="text-h6 os-bold text-os-grey-dark q-mb-sm">
            SHOW PRO PANAMA
          </div>
          <q-btn
            label="Follow"
            no-caps
            color="os-pink"
            rounded
            class="full-width os-semibold"
            dense
            unelevated
          />
        </div>
      </div>
      <div class="row q-pb-lg text-center">
        <div class="col">
          <div class="text-subtitle2 os-semibold text-os-grey-dark">
            <span class="text-os-pink">8000</span> eventos
          </div>
        </div>
        <div class="col">
          <div class="text-subtitle2 os-semibold text-os-grey-dark">
            <span class="text-os-pink">600</span> followers
          </div>
        </div>
      </div>
    </div>
    <div class="q-pa-md">
      <div class="text-subtitle2 os-semibold text-os-grey-dark q-mb-sm">
        Acerca
      </div>
      <div class="text-body2 q-mb-md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        suscipit ullamcorper purus et varius. Quisque fringilla vestibulum
        gravida.
      </div>
      <div class="text-subtitle2 os-semibold text-os-grey-dark q-mb-sm">
        Ubicación
      </div>
      <div class="text-body2 q-mb-md">
        Calle 50
      </div>
      <div class="text-subtitle2 os-semibold text-os-grey-dark q-mb-sm">
        Contacto
      </div>
      <div class="text-body2 q-mb-md">
        +507 236-1111 / contacto@showpro.com
      </div>
      <div class="text-subtitle2 os-semibold text-os-grey-dark q-mb-sm">
        Website
      </div>
      <div class="text-body2 q-mb-md">
        <u>www.showpro.com</u>
      </div>
    </div>
    <q-separator />
    <div class="text-h6 os-semibold text-os-grey-dark q-pa-md">
      Eventos proximos
    </div>
    <event-row />
    <event-row />
    <event-row />
  </q-page>
</template>
