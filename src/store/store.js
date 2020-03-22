import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '../components/plugins/fb'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    notes: []
  },

  mutations: {
    createNote (state, note) {
      if (note.title.length || note.content.length > 0) {
        state.notes.push(note)
      }
    },
    removeNote (state, noteid) {
      state.notes = state.notes.filter(n => {
        return n.id !== noteid
      })
    },
    setNoteInNotes (state, note) {
      let notes = state.notes
      notes.push(note)
      Vue.set(state.notes, notes)
    }
  },

  actions: {

    fetchNotes: ({ state, commit }) => new Promise((resolve) => {
      db.collection('notes').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          commit('setNoteInNotes', doc.data())
        })

        resolve(Object.values(state.notes))
      })
    }),

    saveNote: ({ commit }, note) => {
      db.collection('notes').add({
        ...note
      })
        .then(() => {
          commit('createNote', note)
        })
    },

    deleteNote: ({ state, commit }, id) => new Promise((resolve) => {
      db.collection('notes').get().then(snap => {
        snap.forEach((document) => {
          if (document.data().id === id) {
            db.collection('notes').doc(document.id).delete()
              .then(() => commit('removeNote', id))
          }
        })
      })
      resolve(state.notes)
    })

  }
})

export default store
