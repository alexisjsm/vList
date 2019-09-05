<template lang="pug">
#nueva-nota.modal(:class="{'is-active':showNewNota}")
    .modal-background
    .modal-card
        header.modal-card-head
            p.modal-card-title Nueva nota
            button.delete(@click="closed")
        section.modal-card-body
            .field
                .control
                    input(type="text" class="input" placeholder="Titulo" name="title" v-model='Nota.title')
                .control
                    textarea(class="textarea" placeholder="Nota" name="content" v-model='Nota.content')
            footer.modal-card-footer
                .field.is-grouped
                    .control
                      span {{Check}}
                        button.button.is-link(@click="save" v-show="showSave")
                          span.icon
                            font-awesome-icon(icon="save")
                          span Guardar
                    .control
                        button.button.is-danger(@click='clean')
                          span.icon
                            font-awesome-icon(icon="backspace")
                          span Borrar
</template>

<script>
export default {
  name: 'nueva-nota',
  data () {
    return {
      showNewNota: this.isActive,
      showSave: false,
      Nota: {
        id: '',
        title: '',
        content: ''
      }
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
      this.$bus.$emit('save', this.Nota)
      this.$bus.$emit('closedMe', this.showNewNota)
    },
    timestamp () {
      let time = new Date()
      this.Nota.id = time.getTime()
    },
    clean () {
      this.Nota.title = ''
      this.Nota.content = ''
      console.log(`Lanzado el evento Clean`)
      this.$emit('clean')
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
</style>
