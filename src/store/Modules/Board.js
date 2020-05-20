import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db, Timestamp, storage } from '../../components/plugins/fb'

export const dashboard = {
  state: {
    board: []
  },

  getters: {
    getBoardById: (state) => (id) => {
      return state.board.find(note => note.id === id)
    },
    getBoardAll: (state) => {
      return state.board
    }
  },

  mutations: {
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
      if (note.file) {
        storage.ref().child(`image/${note.file}`).getDownloadURL().then((url) => {
          let headers = new Headers()
          let init = {
            method: 'GET',
            headers: headers,
            mode: 'cors',
            cache: 'default'
          }
          fetch(url, init)
            .then((response) => {
              if (response.ok) {
                response.blob().then((img) => {
                  note.file = URL.createObjectURL(img)
                })
              }
            })
        })
      }
      state.board.push(note)
    },
    removeIteamInList (state, infoItem) {
      let { id, indexItem } = infoItem

      let indexState = 0

      for (let sb in state.board) {
        if (sb.id === id) {
          indexState = sb
        }
      }
      state.board[indexState].list = state.board[indexState].list.filter(value => value.name !== indexItem)
    },
    ...vuexfireMutations
  },

  actions: {
    fetchNotes: firestoreAction(({ commit }) => {
      const data = db.collection('board').get()
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
      return data
    }),

    saveNote: firestoreAction(({ commit }, note) => {
      const { time, file } = note
      let newNote = {}
      if (file) {
        let storageRef = storage.ref()
        let upload = storageRef.child('image/' + file.name).put(file)
        upload.then((response) => {
          console.log(response)
        })
        newNote = {
          ...note,
          time: Timestamp.fromDate(new Date(time)),
          file: file.name
        }
      } else {
        newNote = {
          ...note,
          time: Timestamp.fromDate(new Date(time))
        }
      }

      const data = db.collection('board').add(newNote)
        .then((docRef) => {
          newNote.id = docRef.id
          commit('setNotesInBoard', newNote)
          return { message: 'Ok' }
        })
      return data
    }),

    deleteNote: firestoreAction(({ commit, state }, id) => {
      const data = db.collection('board').doc(id).get()
        .then(doc => {
          let note = doc.data()
          if (note.file) {
            storage.ref().child(`image/${note.file}`).delete()
          }
        })
        .then(() => {
          let remove = db.collection('board').doc(id).delete()
            .then(() => {
              commit('removeNote', id)
              return { message: 'Ok', data: state.board }
            })
          return remove
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
    }),
    removeIteamList: firestoreAction(({ commit }, infoItem) => {
      let { id, indexItem, list } = infoItem

      const noteRef = db.collection('board').doc(id)
        .update({
          list: list.filter(value => value.name !== indexItem)
        })
        .then(() => {
          commit('removeIteamInList', infoItem)
          return { message: 'Ok' }
        })
      return noteRef
    })
  }
}
