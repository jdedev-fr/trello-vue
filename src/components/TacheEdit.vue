<template>
  <article :class="$style.tache">
    <input type="text" v-model="titre" @input="changeInp()" />
    <textarea v-model="contenu" @input="changeInp()"></textarea>
    <div :class="$style.ligne">
      <div></div>
      <div :class="$style.btnVert" @click="editTache(getTache._id)">
        Valider
      </div>
      <div></div>
    </div>
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
  padding: 5px;
}
.tache > input {
  width: 90%;
  height: 40px;
}
.tache > textarea {
  width: 90%;
  height: 200px;
}
.ligne {
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btnVert {
  border: none;
  padding: 5px 30px;
  color: black;
  font-weight: bold;
  background-color: green;
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
  data() {
    return {
      titre: "" as string,
      contenu: "" as string,
    };
  },
  mounted() {
    this.titre = this.getTache.title;
    this.contenu = this.getTache.content;
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
    ...mapActions(["editTache", "modifTache"]),
    changeInp() {
      this.modifTache({
        _id: this.getTache._id,
        title: this.titre,
        content: this.contenu,
        state: this.getTache.state,
      });
    },
  },
});
</script>
