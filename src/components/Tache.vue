<template>
  <article :class="$style.tache">
    <h3>{{ getTache.title }}</h3>
    <p>{{ getTache.content }}</p>
    <div :class="$style.ligne">
      <div
        :class="$style.btn"
        v-if="type != 0"
        @click="changeColM(getTache._id)"
      >
        &lt;
      </div>
      <div v-else></div>
      <div :class="$style.btnVert" @click="editTache(getTache._id)">Modif</div>
      <div
        :class="$style.btn"
        v-if="type != 2"
        @click="changeColP(getTache._id)"
      >
        &gt;
      </div>
      <div v-else></div>
    </div>
    <div :class="$style.btnRouge" @click="suppTache(getTache._id)">X</div>
  </article>
</template>

<style module>
.tache {
  width: 90%;
  border: solid black 1px;
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  min-height: 200px;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: relative;
}
.tache > * {
  margin: 10px;
}
.ligne {
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn {
  border: none;
  padding: 5px 30px;
  background-color: royalblue;
  color: black;
  font-weight: bold;
}
.btnVert {
  border: none;
  padding: 5px 30px;
  color: black;
  font-weight: bold;
  background-color: green;
}
.btnRouge {
  border: none;
  padding: 5px 30px;
  color: black;
  font-weight: bold;
  background-color: tomato;
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "Tache",
  props: {
    tache: {
      type: String,
      require: true,
    },
    type: {
      type: Number,
      require: true,
    },
  },
  computed: {
    getTache() {
      if (typeof this.$props.tache == "string") {
        return JSON.parse(this.$props.tache);
      } else {
        return {};
      }
    },
  },
  methods: {
    ...mapActions(["changeColP", "changeColM", "suppTache", "editTache"]),
  },
});
</script>
