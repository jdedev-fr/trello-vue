<template>
  <div :class="$style.contener">
    <section>
      <h2>A Faire</h2>
    </section>
    <section>
      <h2>En cours</h2>
    </section>
    <section>
      <h2>Terminé</h2>
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