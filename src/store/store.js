import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '../components/plugins/fb'
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
      db.ref('notes').once('value', (snapshot) => {
        const notes = snapshot.val()
        Object.keys(notes).forEach((noteId) => {
          const note = notes[noteId]
          commit('setNotes', note)
        })
      })
      resolve(Object.values(state.notes))
    }),

    saveNote: ({ commit }, note) => new Promise((resolve, reject) => {
      let isKo = false
      let newNote = note
      console.log(newNote)
      let noteId = db.ref('notes').push().key
      let updates = {
        ...newNote
      }
      db.ref('notes/' + noteId).update(updates, error => {
        if (error) {
          isKo = true
        }
      }).then(() => {
        commit('setNotes', updates)
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
          }
        })
      })
      commit('removed', id)
      resolve(Object.values(state.notes))
    })
  }
})

export default store
