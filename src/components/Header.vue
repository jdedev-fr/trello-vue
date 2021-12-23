<template>
  <header :class="$style.header">
    <h1>Kanban Vue</h1>
    <nav>
      <router-link to="/">Login</router-link>
      <router-link to="/inscription">Inscription</router-link>
      <router-link to="/taches">Taches</router-link>
      <router-link to="/mon-compte">Mon Compte</router-link>
      <router-link to="/deco">Deconnexion</router-link>
    </nav>
  </header>
</template>

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