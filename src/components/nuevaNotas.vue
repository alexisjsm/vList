<template lang="pug">
transition(name="fade")
  b-modal(has-modal-card :active.sync="showNewNota")
      .modal-card
          header.modal-card-head
              h1.modal-card-title Nueva nota
              button.delete(@click="buttonClosed")
          section.modal-card-body
            b-field
              .control
                b-input(type="text" placeholder="Titulo" name="title" v-model='title')
                .control
                  .buttons
                    b-button(@click="buttonList" icon-right="list-ul")
            b-field
              .control(v-if="showList")
                div.columns.is-multiline(v-if="list.length>=1")
                  ul
                    li.column.is-full(name="list" v-for=" (valueList,keyList ) in list") {{valueList['name']}}
                      span.buttons.are-small
                        b-button(@click="buttonRemove(keyList)" icon-right="trash-alt")
                div.content
                  b-input(placeholder="Pulsa Enter para añadir a la lista" name="list" v-model="element" @keyup.native.enter="buttonAddList")
              .control(v-else)
                b-input(type="textarea" placeholder="Nota" name="content" v-model='content')
            footer.modal-card-footer
                b-field
                  .buttons
                    b-button(v-model="check" type="is-info" @click="buttonSave" v-show="showSave" icon-left="save") Guardar
                    b-button(type="is-danger" @click='buttonClean' icon-left="backspace") Borrar
</template>

<script>
import Note from './modal/Note.js'
import Task from './modal/Task.js'
export default {
  name: 'nueva-nota',
  data () {
    return {
      showNewNota: this.isActive,
      showSave: false,
      showList: false,
      time: 0,
      title: '',
      content: '',
      list: [],
      element: '',
      dataSelelect: ''
    }
  },
  props: {
    isActive: {
      type: Boolean
    }
  },
  computed: {
    check () {
      return this.checkNewNote()
    }
  },
  methods: {
    buttonClosed () {
      this.showNewNota = false
      this.$bus.$emit('closedMe', this.showNewNota)
    },
    checkNewNote () {
      if (this.title.length > 0 & this.content.length > 0 || this.title.length > 0 & this.list.length > 0) {
        this.showSave = true
      } else {
        this.showSave = false
      }
    },
    async buttonSave () {
      this.showNewNota = false
      var note
      if (this.list.length <= 0) {
        note = new Note(this.title, this.content, this.time = this.timestamp())
      } else {
        note = new Task(this.title, this.list, this.time = this.timestamp())
      }
      const save = await this.$store.dispatch('saveNote', note)
      if (save === 'Ok') {
        this.$buefy.toast.open({
          message: 'Nota guardada',
          type: 'is-success'
        })
        this.$bus.$emit('closedMe', this.showNewNota)
      } else {
        this.$buefy.toast.open({
          message: 'Nota no guardada',
          type: 'is-danger'
        })
      }
    },
    timestamp () {
      let time = new Date()
      return time.getTime()
    },
    buttonClean () {
      this.title = ''
      this.content = ''
      this.list = []
    },
    buttonList () {
      this.showList = !this.showList
    },
    buttonAddList () {
      if (this.element === '') {
        this.$buefy.toast.open({
          message: 'Texto vacio',
          type: 'is-warning'
        })
      } else {
        let obj = {}
        obj = { name: this.element, type: false }
        this.list.push(obj)
        this.element = ''
      }
    },
    buttonRemove (key) {
      this.list.splice(key, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.control {
  margin-bottom: 10px;
}
.hero {
  border-radius: 10px 10px;
}
.hero-body {
  padding: 0.7em;
}
.column{
  display: inline-flex;
  flex-direction: row;
  p {
    width: 100%;
  }
}
ul {
    display: inline-flex;
    flex-direction: column;
    width: 100%;
    padding: 0.625rem;

}
li {
  border-radius: 4px;
  border: 1px #b5b5b5 solid;
  padding: .3rem;
  margin-right: .3em;
  margin-bottom: .3rem;
  width: 100%;
  justify-content: space-between;

}
</style>
