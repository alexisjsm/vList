import Vue from 'vue'
import Vuex from 'vuex'
import { db } from './components/plugins/fb'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    notes: []
  },

  mutations: {
    save (state, note) {
      if (note.title.length || note.content.length > 0) {
        state.notes.push(note)
      }
    },
    removed (state, noteid) {
      state.notes = state.notes.filter(n => {
        return n.id !== noteid
      })
    },

    setNotes (state, note) {
      let notes = state.notes
      notes.push(note)

      Vue.set(state.notes, notes)
    }
  },

  actions: {
    fetchNotes: ({ state, commit }) => new Promise((resolve) => {
      let instance = db.ref('notes')

      instance.once('value', (snapshot) => {
        const notes = snapshot.val()

        Object.keys(notes).forEach((noteId) => {
          const note = notes[noteId]
          console.log(note)
          commit('setNotes', note)
        })
      })

      resolve(Object.values(state.notes))
    })
  }
})

export default store
