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
    checkedList (state) {
      let board = state.board
      return board
    },
    setNotesInBoard (state, note) {
      state.board.push(note)
    },
    ...vuexfireMutations
  },

  actions: {
    fetchNotes: firestoreAction(({ commit, bindFirestoreRef }) => {
      const data = bindFirestoreRef('board', db.collection('board').get()
        .then((querysnapshot) => {
          querysnapshot.forEach((doc) => {
            let note = {
              id: doc.id,
              ...doc.data()
            }
            commit('setNotesInBoard', note)
            return { message: 'Ok' }
          })
        })
      )
      return data
    }),

    saveNote: firestoreAction(({ commit }, note) => {
      const { time } = note
      let newNote = {
        ...note,
        time: Timestamp.fromDate(new Date(time))
      }

      const data = db.collection('board').add(newNote)
        .then((docRef) => {
          newNote.id = docRef.id
          commit('createNote', newNote)
          return { message: 'Ok' }
        })
      return data
    }),

    deleteNote: firestoreAction(({ commit, state }, id) => {
      const data = db.collection('board').doc(id).delete()
        .then(() => {
          commit('removeNote', id)
          return { message: 'Ok', data: state.board }
        })
      return data
    }),

    changeStateListElement: firestoreAction(({ commit }, oldnote) => {
      let { list } = oldnote
      const data = db.collection('board').doc(oldnote.id)
        .update({ list: list })
        .then(() => {
          commit('checkedList')
          return { message: 'Ok' }
        })
      return data
    })
  }
})
