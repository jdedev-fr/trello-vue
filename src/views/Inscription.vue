<template>
  <form :class="$style.form" @submit="sendForm">
    <input type="text" placeholder="Login" v-model="login" />
    <input type="text" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Mot de passe" v-model="mdp" />
    <input type="password" placeholder="Mot de passe" v-model="confirm" />
    <input type="submit" value="Inscription" />
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
interface SubmitEvent extends Event {
  /**
   * Returns the element representing the submit button that triggered the form submission, or null if the submission was not triggered by a button.
   */
  readonly submitter: HTMLElement | null;
}

export default defineComponent({
  data() {
    return {
      login: "" as string,
      mdp: "" as string,
      email: "" as string,
      confirm: "" as string,
    };
  },
  methods: {
    sendForm(e: SubmitEvent) {
      e.preventDefault();
      console.log(
        this.$data.login,
        this.$data.mdp,
        this.$data.email,
        this.$data.confirm
      );
      if (this.$data.mdp !== this.$data.confirm) {
        alert("Les mots de passe doivent être identiques");
      } else {
        fetch("https://trello.jdedev.fr/api/user/", {
          method: "POST",
          body: JSON.stringify({
            nom: this.$data.login,
            mdp: this.$data.mdp,
            email: this.$data.email,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then(function (response) {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(response);
          })
          .then(function (data) {
            console.log(data);
          })
          .catch(function (error) {
            console.warn("Something went wrong.", error);
          });
      }
    },
  },
});
</script>


<style module>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid black 1px;
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  width: 400px;
  margin: 50px auto;
}
.form * {
  width: 80%;
  min-height: 30px;
  margin: 10px;
}
.form [type="submit"] {
  background-color: royalblue;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
}
.form [type="submit"]:hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>