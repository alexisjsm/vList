<template lang="pug">
#notas.column
  .columns.is-multiline(v-if="notes.length>=1")
   .column.is-one-quarter( v-for="note in notes")
      transition-group(name="fade")
        .hero.is-light(is="nota" :key="note.id" :note="note" @selected="setSelected" :class="{'is-active': note.id === noteId}" :isSelected="noteId")
  .columns.is-centered(v-else)
    .column.is-half
      .hero
        .hero-body
          div.container.is-fuild
            h1.title.is-bold No hay notas
</template>

<script>
import nota from './nota.vue'
export default {
  name: 'notas',
  components: {
    nota
  },
  data () {
    return {
      notes: [
        {
          id: 1,
          title: 'Todo',
          content: '',
          contentList: [
            'Realizar un backend',
            'Agregar multimedia ( video, imagen)',
            'editar nota',
            'editor de texto'
          ]
        }
      ],
      noteId: 0
    }
  },
  created () {
    this.$bus.$on('save', (note) => {
      if (note.title.length || note.content.length > 0) {
        this.notes.push(note)
      }
    })
  },
  mounted () {
    this.$bus.$on('removed', (id) => {
      this.notes = this.notes.filter(n => {
        return n.id !== id
      })
      console.log(this.notes)
    })
  },
  methods: {

    setSelected (id, isActive) {
      this.noteId = id
    }
  }
}
</script>

<style lang="scss" scoped>
.hero{
  border-radius: 5px 5px;
}
.is-active{
  border: 1px black solid;
  box-shadow: 2px 2px 5px rgba(133, 133, 133)
  }
</style>
