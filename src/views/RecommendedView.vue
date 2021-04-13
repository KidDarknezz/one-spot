<template>
  <q-page class="q-pa-lg">
    <div class="row q-mb-lg">
      <q-btn icon="arrow_back" flat round @click="$router.go(-1)" />
      <div class="text-h5 os-semibold q-ml-md flex flex-center">
        Recomendado
      </div>
    </div>
    <div
      class="row q-mb-md"
      v-for="(recommended, i) in recommendedEvents.slice(0, 4)"
      :key="i"
      @click="$router.push(`/event/${recommended.id}`)"
    >
      <div class="col-4">
        <img
          src="@/assets/event_2_thumbnail.webp"
          width="100%"
          class="os-rounded-border"
        />
      </div>
      <div class="col-8 q-pa-md">
        <div class="text-subtitle2 os-semibold">{{ recommended.name }}</div>
        <div class="text-caption text-grey-9">{{ recommended.subtitle }}</div>
        <div class="text-caption text-grey-6">
          {{ recommended.dateAndTime[0].startDate }}
        </div>
      </div>
    </div>
    <q-separator class="q-mb-md" />
    <div class="text-caption os-semibold text-center q-mb-sm">
      {{ recommendedEvents.length }} eventos recomendados en base a tus gustos.
    </div>
    <div class="text-caption os-semibold text-center">
      <span
        class="os-cat-cta q-mx-xs"
        v-for="interest of activeUser.interests"
        :key="interest"
      >
        {{ categoryName(interest) }}
      </span>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import categoriesMixin from "@/mixins/categoriesMixin";

export default {
  computed: {
    ...mapState("homeStore", ["recommendedEvents"]),
    ...mapState("authStore", ["activeUser"]),
  },
  methods: {
    ...mapActions("homeStore", ["getRecommendedEvents"]),
  },
  mixins: [categoriesMixin],
  mounted() {
    window.scrollTo(0, 0);
    if (this.recommendedEvents.length <= 0)
      this.getRecommendedEvents(this.activeUser.interests);
  },
};
</script>
