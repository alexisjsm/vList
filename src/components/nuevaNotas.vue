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
                    li.column.is-full(name="list" v-for="(n,index) in list") {{n}}
                      span.buttons.are-small
                        b-button(@click="buttonRemove(index)" icon-right="trash-alt")
                div.content
                  b-input(placeholder="Pulsa Enter para añadir a la lista" name="list" v-model="dataList" @keyup.native.enter="buttonAddList")
              .control(v-else)
                b-input(type="textarea" placeholder="Nota" name="content" v-model='content')
            footer.modal-card-footer
                b-field
                  .buttons
                    span {{Check}}
                      b-button(type="is-info" @click="buttonSave" v-show="showSave" icon-left="save") Guardar
                    b-button(type="is-danger" @click='buttonClean' icon-left="backspace") Borrar
</template>

<script>
import Note from './modal/Note.js'
export default {
  name: 'nueva-nota',
  data () {
    return {
      showNewNota: this.isActive,
      showSave: false,
      showList: false,
      ActiveIs: false,
      title: '',
      content: '',
      list: [],
      dataList: '',
      dataSelelect: ''
    }
  },
  props: {
    isActive: {
      type: Boolean
    }
  },
  computed: {
    Check () {
      return this.CheckNewNote()
    }
  },
  methods: {
    buttonClosed () {
      this.showNewNota = false
      this.$bus.$emit('closedMe', this.showNewNota)
    },
    CheckNewNote () {
      if (this.title || this.content > 0) {
        this.showSave = true
      } else {
        this.showSave = false
      }
    },
    buttonSave () {
      this.showNewNota = false
      var note
      if (this.list.length <= 0) {
        note = new Note(this.title, this.content)
        console.log(this.list.length)
      } else {
        note = new Note(this.title, null, this.list)
      }
      const save = this.$store.dispatch('saveNote', note)
      save
        .then(() => {
          this.$buefy.toast.open({
            message: 'Nota guardada',
            type: 'is-success'
          })
          this.$bus.$emit('closedMe', this.showNewNota)
        })
        .catch(() => {
          this.$buefy.toast.open({
            message: 'Nota no guardada',
            type: 'is-danger'
          })
        })
    },
    buttonClean () {
      this.title = ''
      this.content = ''
      this.list = []
    },
    buttonList () {
      this.showList = !this.showList
      this.content = ''
      this.list = []
    },
    buttonAddList () {
      this.list.push(this.dataList)
      this.dataList = ''
    },
    buttonRemove (index) {
      this.list.splice(index, 1)
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
