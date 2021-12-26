import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: [
      {
        _id: "456",
        content: "contenu",
        title: "titre",
        state: 0
      },
      {
        _id: "123",
        content: "contenu 2",
        title: "titre 2",
        state: 1
      },
      {
        _id: "789",
        content: "contenu 3",
        title: "titre 3",
        state: 0
      }
    ] as tache[]
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
    }
  },
  actions: {
    changeColP({ commit }, id) {
      commit("BOUGE_PLUS", id)
    },
    changeColM({ commit }, id) {
      commit("BOUGE_MOINS", id)
    },
    suppTache({ commit }, id) {
      commit("SUPP_TACHE", id)
    },
    editTache({ commit }, id) {
      commit("CHANGE_EDIT", id)
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