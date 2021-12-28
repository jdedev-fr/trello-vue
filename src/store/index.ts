import { createStore } from 'vuex'

export default createStore({
  state: {
    id: "",
    tasks: [] as tache[]
  },
  mutations: {
    BOUGE_PLUS(state, idTache) {
      const index = state.tasks.findIndex(elem => elem._id == idTache)
      state.tasks[index].state++
    },
    BOUGE_MOINS(state, idTache) {
      const index = state.tasks.findIndex(elem => elem._id == idTache)
      state.tasks[index].state--
    },
    CHANGE_EDIT(state, idTache) {
      const index = state.tasks.findIndex(elem => elem._id == idTache)
      state.tasks[index].edit = (state.tasks[index].edit === true) ? false : true
    },
    SUPP_TACHE(state, idTache) {
      const index = state.tasks.findIndex(elem => elem._id == idTache)
      state.tasks.splice(index, 1)
    },
    AJOUT_TACHE(state, task: tache) {
      state.tasks.push(task)
    },
    MODIF_TACHE(state, task: tache) {
      const index = state.tasks.findIndex(elem => elem._id == task._id)
      state.tasks[index] = { ...task }
    },
    RECUP_ALL_TACHES(state, tabTask: tache[]) {
      state.tasks = [...tabTask]
    },
    CONNECT(state, id) {
      state.id = id
      state.tasks = []
    },
    DECO(state) {
      state.id = ""
      state.tasks = []
    }
  },
  actions: {
    changeColP({ commit }, id) {

      const indTache = this.state.tasks.findIndex(elem => elem._id == id)
      fetch("https://trello.jdedev.fr/api/user/" + this.state.id + "/tache/" + indTache, {
        method: "PUT",
        body: JSON.stringify({
          titre: this.state.tasks[indTache].title,
          contenu: this.state.tasks[indTache].content,
          etat: this.state.tasks[indTache].state + 1
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
          if (data.mess) {
            alert(data.mess);
          } else {
            console.log(data);
            commit("BOUGE_PLUS", id)
          }
        })
        .catch(function (error) {
          console.warn("Something went wrong.", error);
        });


    },
    changeColM({ commit }, id) {
      const indTache = this.state.tasks.findIndex(elem => elem._id == id)
      fetch("https://trello.jdedev.fr/api/user/" + this.state.id + "/tache/" + indTache, {
        method: "PUT",
        body: JSON.stringify({
          titre: this.state.tasks[indTache].title,
          contenu: this.state.tasks[indTache].content,
          etat: this.state.tasks[indTache].state - 1
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
          if (data.mess) {
            alert(data.mess);
          } else {
            console.log(data);
            commit("BOUGE_MOINS", id)
          }
        })
        .catch(function (error) {
          console.warn("Something went wrong.", error);
        });

    },
    suppTache({ commit }, id) {
      const indTache = this.state.tasks.findIndex(elem => elem._id == id)
      fetch("https://trello.jdedev.fr/api/user/" + this.state.id + "/tache/" + indTache, {
        method: "DELETE",
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
          if (data.mess) {
            alert(data.mess);
          } else {
            console.log(data);
            commit("SUPP_TACHE", id)
          }
        })
        .catch(function (error) {
          console.warn("Something went wrong.", error);
        });

    },
    editTache({ commit }, id) {
      const indTache = this.state.tasks.findIndex(elem => elem._id == id)
      if (this.state.tasks[indTache].edit === true) {
        fetch("https://trello.jdedev.fr/api/user/" + this.state.id + "/tache/" + indTache, {
          method: "PUT",
          body: JSON.stringify({
            titre: this.state.tasks[indTache].title,
            contenu: this.state.tasks[indTache].content,
            etat: this.state.tasks[indTache].state
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
            if (data.mess) {
              alert(data.mess);
            } else {
              console.log(data);
              commit("CHANGE_EDIT", id)
            }
          })
          .catch(function (error) {
            console.warn("Something went wrong.", error);
          });
      }
      else {

        commit("CHANGE_EDIT", id)
      }

    },
    ajoutTache({ commit }) {
      fetch("https://trello.jdedev.fr/api/user/" + this.state.id + "/tache", {
        method: "POST",
        body: JSON.stringify({
          titre: "",
          contenu: "",
          etat: 0
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
          if (data.mess) {
            alert(data.mess);
          } else {
            console.log(data);
            //            commit("RECUP_ALL_TACHES", data.tasks)
            const task: tache = {
              _id: data._id,
              title: "",
              content: "",
              state: 0,
              edit: true
            }
            commit("AJOUT_TACHE", task)
          }
        })
        .catch(function (error) {
          console.warn("Something went wrong.", error);
        });


    },
    modifTache({ commit }, payload: tache) {
      const task: tache = {
        _id: payload._id,
        title: payload.title,
        content: payload.content,
        state: payload.state,
        edit: true
      }
      commit("MODIF_TACHE", task)
    },
    recupAllFromApi({ commit }) {
      fetch("https://trello.jdedev.fr/api/user/" + this.state.id, {
        method: "GET",
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
          if (data.mess) {
            alert(data.mess);
          } else {
            console.log(data);
            commit("RECUP_ALL_TACHES", data.tasks)
          }
        })
        .catch(function (error) {
          console.warn("Something went wrong.", error);
        });

    },
    connect({ commit }, id) {
      commit("CONNECT", id)
    },
    deco({ commit }) {
      commit("DECO")
    }
  },
  modules: {
  }
})

interface tache {
  _id: string,
  content: string,
  title: string,
  state: number,
  edit?: boolean
}