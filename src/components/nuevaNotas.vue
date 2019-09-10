<template lang="pug">
transition(name="fade")
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
                    .buttons
                      span.button.icon(@click="list")
                        font-awesome-icon(icon='list-ul')
                  .control(v-if="showList")
                    div(v-if="Nota.contentList.length>=1")
                      input.input(placeholder="Lista" name="list" v-for="n in Nota.contentList" :value="n")
                    div
                      input.input(placeholder="Lista" name="list" v-model="dataList" @keyup.enter="addList")
                  .control(v-else)
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
      showList: false,
      Nota: {
        id: '',
        title: '',
        content: '',
        contentList: []
      },
      dataList: ''
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
      this.Nota.contentList = []
      console.log(`Lanzado el evento Clean`)
      this.$emit('clean')
    },
    list () {
      this.showList = !this.showList
      this.Nota.content = ''
      this.Nota.contentList = []
      this.$emit('list')
    },
    addList () {
      this.Nota.contentList.push(this.dataList)
      this.dataList = ''
      this.$emit('addList')
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
