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
    fetchNotes: ({ state, commit }) => new Promise((resolve, reject) => {
      db.ref('notes').once('value', (snapshot) => {
        const notes = snapshot.val()
        if (notes != null) {
          Object.keys(notes).forEach((noteId) => {
            const note = notes[noteId]
            commit('setNoteInNotes', note)
          })
        }
      })
      resolve(Object.values(state.notes))
    }),

    saveNote: ({ commit }, note) => new Promise((resolve, reject) => {
      let isKo = false
      let noteId = db.ref('notes').push().key
      let updates = {
        ...note
      }
      db.ref('notes/' + noteId).update(updates, error => {
        if (error) {
          isKo = true
        }
      }).then(() => {
        commit('createNote', updates)
      })
      if (isKo === false) {
        resolve(isKo)
      } else {
        reject(isKo)
      }
    }),

    deleteNote: ({ state, commit }, id) => new Promise((resolve) => {
      const instance = db.ref('notes')

      instance.once('value', (snapshot) => {
        const oldNotes = snapshot.val()
        Object.keys(oldNotes).forEach((noteKey) => {
          if (oldNotes[noteKey].id === id) {
            db.ref('notes').child(noteKey).remove()
              .then(() => commit('removeNote', id))
          }
        })
      })
      Object.values(state.notes)
    })
  }
})

export default store
