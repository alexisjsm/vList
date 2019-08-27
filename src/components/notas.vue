<template lang="pug">
.columns.is-centered
  #notas.column
    .columns.is-multiline(v-if="notes.length>=1")
        .column.is-one-quarter(v-for="note in notes" :key="Math.random()")
            .hero.is-light
                .hero-body
                    div.container
                        h1.title.is-bold {{note.title}}
                        p {{note.content}}
    .columns.is-centered(v-else)
        .column.is-half
            .hero
                .hero-body
                    div.container.is-fuild
                        h1.title.is-bold No hay notas
</template>

<script>
export default {
  name: 'notas',
  data () {
    return {
      notes: [
      ]
    }
  },
  created () {
    this.$bus.$on('save', (note) => {
      this.notes.push(note)
    })
  }
}
</script>

<style lang="scss" scoped>
    #notas{
        .title{
          text-align: center;
        }
        .hero-body{
          padding: 1em;
        }
        .hero{
            border-radius: 5px 5px;
        }

    }
</style>
