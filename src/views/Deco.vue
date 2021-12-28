<template>
  <p>Deco work</p>
</template>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  methods: {
    ...mapActions(["deco"]),
  },
  mounted() {
    this.deco();
    router.push("/");
  },
});
</script>
