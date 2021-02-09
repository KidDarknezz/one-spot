<template >
  <q-layout view="lHh Lpr lFf" id="app">
    <q-page-container>
      <router-view />
      <div
        class="row fixed-bottom bg-grey-2 q-py-xs"
        v-if="!$route.fullPath.includes('selected-assignature')"
      >
        <div class="col">
          <div class="justify-center row">
            <q-btn
              flat
              round
              dense
              icon="list_alt"
              size="lg"
              :color="
                $route.fullPath.includes('my-assignatures') ? 'red' : 'black'
              "
              to="/my-assignatures"
            />
          </div>
        </div>
        <div class="col">
          <div class="justify-center row">
            <q-btn
              flat
              round
              dense
              icon="inventory_2"
              size="lg"
              :color="
                $route.fullPath.includes('closed-assignatures')
                  ? 'red'
                  : 'black'
              "
              to="/closed-assignatures"
            />
          </div>
        </div>
        <div class="col">
          <div class="justify-center row">
            <q-btn
              flat
              round
              dense
              size="lg"
              :color="$route.fullPath.includes('profile') ? 'red' : 'black'"
              to="/profile"
            >
              <q-avatar size="40px">
                <!-- <q-img
                  v-if="userData.profileAvatar"
                  :src="
                    require(`@/assets/avatars/${userData.profileAvatar}.png`)
                  "
                /> -->
              </q-avatar>
            </q-btn>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<style>
#app {
  font-family: "Poppins", sans-serif;
}

.os-font {
  font-family: "Poppins", sans-serif;
}
</style>