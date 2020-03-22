<template lang="pug">
#notas
  .columns.is-multiline(v-if="notes.length>=1")
   .column.is-one-quarter(v-for="note in notes")
      .tile.is-ancestor(
        is="nota"
        :key="note.id"
        :note="note"
        @selected="setSelected"
        :class="{'is-active': note.id === noteId}"
        :isSelected="noteId")
  .columns.is-centered(v-else)
    .column
      .hero
        .hero-body
          div.container.is-fluid
            h1.title.is-bold.has-text-centered No hay notas
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
      noteId: 0
    }
  },
  methods: {
    setSelected (id) {
      this.noteId = id
    },
    createNotes () {
      this.$store.dispatch('fetchNotes')
    }
  },
  computed: {
    notes () {
      return this.$store.state.notes
    }
  },
  created () {
    this.createNotes()
  }
}
</script>
