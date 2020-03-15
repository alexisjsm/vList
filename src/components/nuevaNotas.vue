<template lang="pug">
transition(name="fade")
  b-modal(has-modal-card :active.sync="showNewNota")
      .modal-card
          header.modal-card-head
              h1.modal-card-title Nueva nota
              button.delete(@click="closed")
          section.modal-card-body
            b-field
              .control
                b-input(type="text" placeholder="Titulo" name="title" v-model='Nota.title')
                .control
                  .buttons
                    b-button(@click="list" icon-right="list-ul")
            b-field
              .control(v-if="showList")
                div.columns.is-multiline(v-if="Nota.contentList.length>=1")
                  div.column.is-12(name="list" v-for="(n,index) in Nota.contentList")
                    p.divInput {{n}}
                    span.buttons.are-small
                      button.button(@click="remove(index)")
                        span.icon
                          font-awesome-icon(icon="trash-alt")
                div.content
                  b-input(placeholder="Pulsa Enter para añadir a la lista" name="list" v-model="dataList" @keyup.native.enter="addList")
              .control(v-else)
                  b-input(type="textarea" placeholder="Nota" name="content" v-model='Nota.content')
            footer.modal-card-footer
                b-field
                  .control
                    span {{Check}}
                      b-button(type="is-info" @click="save" v-show="showSave" icon-left="save") Guardar
                  .control
                      b-button(type="is-danger" @click='clean' icon-left="backspace") Borrar
</template>

<script>
export default {
  name: 'nueva-nota',
  data () {
    return {
      showNewNota: this.isActive,
      showSave: false,
      showList: false,
      ActiveIs: false,
      Nota: {
        id: '',
        title: '',
        content: '',
        contentList: []
      },
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
    logs () {
      return console.log(`El titulo es ${this.Nota.title} \n El contenido es: ${this.Nota.content} `)
    },
    Check () {
      return this.CheckNewNote()
    }
  },
  methods: {
    closed () {
      console.log('Haciendo click en closedme')
      console.log(`this.showNewNota es ${this.showNewNota}`)
      this.showNewNota = false
      this.$bus.$emit('closedMe', this.showNewNota)
      console.log(`this.showNewNota ahora es ${this.showNewNota}`)
    },
    CheckNewNote () {
      if (this.Nota.title || this.Nota.content > 0) {
        this.showSave = true
      } else {
        this.showSave = false
      }
    },
    save () {
      console.log(`Lanzado el enveto Save`)
      this.timestamp()
      this.showNewNota = false
      this.$store.dispatch('saveNote', this.Nota)

      this.$bus.$emit('closedMe', this.showNewNota)
    },
    timestamp () {
      let time = new Date()
      this.Nota.id = time.getTime()
    },
    clean () {
      this.Nota.title = ''
      this.Nota.content = ''
      this.Nota.contentList = []
    },
    list () {
      this.showList = !this.showList
      this.Nota.content = ''
      this.Nota.contentList = []
    },
    addList () {
      this.Nota.contentList.push(this.dataList)
      this.dataList = ''
    },
    remove (index) {
      this.Nota.contentList.splice(index, 1)
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

.divInput {
  border-radius: 4px;
  border: 1px #b5b5b5 solid;
  padding: .2em;
  margin-right: .3em;
}
</style>
