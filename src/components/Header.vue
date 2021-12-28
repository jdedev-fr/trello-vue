<template>
  <header :class="$style.header">
    <h1>Kanban Vue</h1>
    <nav>
      <router-link
        v-for="(lien, index) in getLiens()"
        :key="index"
        :to="lien.ref"
        >{{ lien.nom }}</router-link
      >
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  computed: {
    ...mapState(["id"]),
  },
  methods: {
    getLiens(): Lien[] {
      if (this.id === "") {
        return [
          { ref: "/", nom: "Login" },
          { ref: "/inscription", nom: "Inscription" },
        ];
      } else {
        return [
          { ref: "/taches", nom: "Taches" },
          { ref: "/mon-compte", nom: "Mon Compte" },
          { ref: "/deco", nom: "Deconnexion" },
        ];
      }
    },
  },
});

interface Lien {
  ref: string;
  nom: string;
}
</script>


<style module>
.header {
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
}
.header > nav {
  display: flex;
}
.header > nav > a {
  color: white;
  text-decoration: none;
  margin: 10px;
}
.header > nav > a:hover {
  text-decoration: underline;
}
</style>