<template lang="pug">
#notas.column
  .columns.is-multiline(v-if="notes.length>=1")
   .column.is-one-quarter( v-for="note in notes")
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
// import { db } from './plugins/fb'

export default {
  name: 'notas',
  components: {
    nota
  },

  beforeCreate () {
    this.$store.dispatch('fetchNotes')
  },
  data () {
    return {
      noteId: 0
    }
  },
  computed: {
    notes: {
      get () {
        return this.$store.state.notes
      },
      set () {}
    }
  },
  // firebase: {
  //   notes: db.ref('notes')
  // },

  methods: {
    setSelected (id) {
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
  border: 1px rgb(163, 163, 163) solid;
  }
</style>
