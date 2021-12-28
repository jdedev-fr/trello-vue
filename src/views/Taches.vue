<template>
  <div :class="$style.contener">
    <section>
      <h2>
        A Faire
        <a
          href="#"
          @click="
            (e) => {
              e.preventDefault();
              ajoutTache();
            }
          "
          >+</a
        >
      </h2>
      <div v-for="task in getAFaire" :key="task._id">
        <Tache
          :tache="JSON.stringify(task)"
          type="0"
          v-if="task.edit != true"
        ></Tache>
        <TacheEdit :tache="JSON.stringify(task)" type="0" v-else></TacheEdit>
      </div>
    </section>
    <section>
      <h2>En cours</h2>
      <div v-for="task in getEnCours" :key="task._id">
        <Tache
          :tache="JSON.stringify(task)"
          type="1"
          v-if="task.edit != true"
        ></Tache>
        <TacheEdit :tache="JSON.stringify(task)" type="1" v-else></TacheEdit>
      </div>
    </section>
    <section>
      <h2>Terminé</h2>
      <div v-for="task in getTermine" :key="task._id">
        <Tache
          :tache="JSON.stringify(task)"
          type="2"
          v-if="task.edit != true"
        ></Tache>
        <TacheEdit :tache="JSON.stringify(task)" type="2" v-else></TacheEdit>
      </div>
    </section>
  </div>
</template>

<style module>
.contener {
  display: flex;
  justify-content: space-around;
}
.contener > * {
  min-width: 300px;
  width: 30%;
  min-height: 85vh;
  border: solid black 1px;
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  margin: 20px;
}
.contener h2 {
  border-bottom: 1px solid black;
  text-align: center;
  padding: 5px;
}
</style>

<script lang="ts">
import store from "@/store";
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import Tache from "../components/Tache.vue";
import TacheEdit from "../components/TacheEdit.vue";

export default defineComponent({
  name: "Taches",
  components: { Tache, TacheEdit },
  computed: {
    getAFaire() {
      return store.state.tasks.filter((elem) => elem.state === 0);
    },
    getEnCours() {
      return store.state.tasks.filter((elem) => elem.state === 1);
    },
    getTermine() {
      return store.state.tasks.filter((elem) => elem.state === 2);
    },
  },
  methods: {
    ...mapActions(["ajoutTache", "recupAllFromApi"]),
  },
  mounted() {
    store.dispatch("recupAllFromApi");
  },
});
</script>
