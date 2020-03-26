import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db, Timestamp } from '../components/plugins/fb'
// import Task from '../components/modal/Task'
// import Note from '../components/modal/Note'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    board: []
  },

  mutations: {
    createNote (state, note) {
      state.board.push(note)
    },
    ...vuexfireMutations,
    removeNote (state, noteid) {
      state.board = state.board.filter(n => {
        return n.id !== noteid
      })
    }
  },

  actions: {
    fetchNotes: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('notes', db.collection('notes'))
    }),

    saveNote: firestoreAction(({ commit }, note) => {
      const { time } = note
      const data = db.collection('notes').add({
        ...note,
        time: Timestamp.fromDate(new Date(time))
      })
        .then(() => {
          commit('createNote', note)
          return 'Ok'
        })
      return data
    }),

    deleteNote: firestoreAction(({ commit }, id) => {
      const data = db.collection('notes').doc(id).delete()
        .then(() => {
          commit('removeNote', id)
          return 'Ok'
        })
      return data
    })
  }
})
