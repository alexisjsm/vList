<template lang="pug">
#notas(ref="notes" :closable="false")
  .columns.is-multiline(v-if="notes.length>=1")
   .column.is-one-quarter(v-for="note in notes")
      .tile.is-ancestor(
        is="nota"
        :key="note.id"
        :notePop="note"
        @selected="setSelected"
        :class="{'is-active': note.getId === noteId}"
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
  name: 'Notas',
  components: {
    nota
  },

  data () {
    return {
      noteId: '',
      isFullPage: true
    }
  },

  created () {
    this.createNotes()
  },

  computed: {
    notes () {
      return this.$store.getters.getBoardAll
    }
  },

  methods: {
    setSelected (id) {
      this.noteId = id
    },
    createNotes () {
      const loadingComponet = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.notes
      })
      this.$store.dispatch('fetchNotes')
      setTimeout(() => loadingComponet.close(), 3 * 1000)
    }
  }
}
</script>
