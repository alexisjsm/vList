<template lang="pug">
  .modal-card
      header.modal-card-head
          h1.modal-card-title Nueva nota
          button.delete(@click="buttonCancel")
      section.modal-card-body
        b-field
          .control
            b-input(type="text" placeholder="Titulo" name="title" v-model='title')
        b-field
          .control
            b-tooltip(label="Create a list" v-if="!showList")
              b-button(@click="buttonList" icon-right="list-ul")
            b-tooltip(label="Create a note" v-else)
              b-button(@click="buttonList" icon-right="sticky-note")
            b-tooltip(label="Updated image")
              b-upload(accept="image/*" v-model="files" @change.native="buttonPrevImg")
                a.button
                  b-icon(icon="images")
        b-field
          .control(v-if="showList")
            div.columns.is-multiline(v-if="list.length>=1")
              ul
                li.column.is-full(name="list" v-for=" (valueList,keyList ) in list") {{valueList['name']}}
                  span.buttons.are-small
                    b-button(@click="buttonRemove(keyList)" icon-right="trash-alt")
            div.content
              b-input(placeholder="Pulsa Enter para añadir a la lista" name="list" v-model="element" @keyup.native.enter="buttonAddList" )
          .control(v-else)
            b-input(type="textarea" placeholder="Nota" name="content" expanded v-model='content')
        b-field(v-if="url!=null")
          .control
            div.column.is-flex.is-centered.image-content
              img(:src="url")
              div.overlay
                div.overlay-content
                  b-button(icon-left="times" @click.native="buttonRemoveImg")
        footer.modal-card-footer
            b-field
              .buttons
                b-button(v-model="check" type="is-info" @click="buttonSave" v-show="showSave" icon-left="save") Guardar
                b-button(type="is-danger" @click='buttonClean' icon-left="backspace") Borrar
</template>

<script>
import Note from '../modules/Note'
import Task from '../modules/Task'
export default {
  name: 'NuevaNota',
  data () {
    return {
      showSave: false,
      showList: false,
      files: null,
      url: null,
      time: 0,
      title: '',
      content: '',
      list: [],
      element: '',
      dataSelelect: ''
    }
  },
  computed: {
    check () {
      return this.checkNewNote()
    }
  },
  methods: {
    buttonCancel () {
      this.$parent.close()
    },
    checkNewNote () {
      if (this.title.length > 0 & this.content.length > 0 || this.title.length > 0 & this.list.length > 0) {
        this.showSave = true
      } else {
        this.showSave = false
      }
    },
    async buttonSave () {
      var note
      if (this.list.length <= 0) {
        note = new Note(this.title, this.content, this.time = this.timestamp(), this.files)
      } else {
        note = new Task(this.title, this.list, this.time = this.timestamp(), this.files)
      }
      const save = await this.$store.dispatch('saveNote', note)
      if (save.message === 'Ok') {
        this.$buefy.toast.open({
          message: 'Nota guardada',
          type: 'is-success'
        })
        this.$parent.close()
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
      this.files = []
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
    },

    buttonPrevImg () {
      if (typeof this.files !== 'undefined') {
        this.url = URL.createObjectURL(this.files)
      } else {
        this.url = null
      }
    },
    buttonRemoveImg () {
      this.files = null
      this.url = null
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

.is-centered{
  justify-content: center;
  align-content: center;
}

.image-content:hover .overlay {
  opacity: 1;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background:  hsla(0, 0%, 86%, 0.5);
}

.overlay-content {
  padding: .5em;
  margin: 0 auto;
  width: 100%;
  align-content: center;
  justify-content: center;
}

</style>
