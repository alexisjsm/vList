<template lang="pug">
#notas.column
  .columns.is-multiline(v-if="notes.length>=1")
    .column.is-one-quarter( v-for="note in notes" )
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
          title: 'Titulo',
          content: 'Laborum reprehenderit adipisicing qui cupidatat. Cillum sunt pariatur velit cupidatat. Tempor dolor enim id anim pariatur sunt ipsum laboris culpa ad.'
        }
      ],
      noteId: 0
    }
  },
  created () {
    this.$bus.$on('save', (note) => {
      this.notes.push(note)
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
  border: 1px black solid
  }
</style>
