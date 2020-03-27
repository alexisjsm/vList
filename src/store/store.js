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
    removeNote (state, noteid) {
      state.board = state.board.filter(n => {
        return n.id !== noteid
      })
    },
    checkedList (state, list) {
      let board = state.board
      console.log(board)
      console.log(`${list}`)
    },
    ...vuexfireMutations
  },

  actions: {
    fetchNotes: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('board', db.collection('board').orderBy('time', 'asc'))
    }),

    saveNote: firestoreAction(({ commit }, note) => {
      const { time } = note
      let newNote = {
        ...note,
        time: Timestamp.fromDate(new Date(time))
      }
      const data = db.collection('board').add(newNote)
        .then(() => {
          // commit('createNote', newNote)
          return 'Ok'
        })
      return data
    }),

    deleteNote: firestoreAction(({ commit }, id) => {
      const data = db.collection('board').doc(id).delete()
        .then(() => {
          commit('removeNote', id)
          return 'Ok'
        })
      return data
    }),

    changeStateListElement: firestoreAction(({ commit }, oldnote) => {
      let { list } = oldnote
      const data = db.collection('board').doc(oldnote.id)
        .update({ list: list })
        .then(() => {
          commit('checkedList', oldnote)
          return 'Ok'
        })
      return data
    })
  }
})
