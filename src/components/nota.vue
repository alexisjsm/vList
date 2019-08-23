<template lang="pug">
  #nota.columns
    .column(v-if="notes.lenght<1")
        section.section(v-for="note in notes" :key="note.title")
            .hero.is-light.radios
                .hero-body
                    div.container
                        h1.title.is-bold {{note.title}}
                        p {{note.parrafo}}
    .column(v-else)
        section.section
            .hero(class="hero is-light radios")
                .hero-body
                    div.container.is-fuild
                        h1.title.is-bold "No hay notas"
</template>

<script>
export default {
  name: 'nota',
  data () {
    return {
      notes: [
      ]
    }
  }

}
</script>

<style lang="scss" scoped>
    #nota{
        div.radios{
            border-radius: 5px 5px;
        }
        h1{
            text-align: center;
        }
    }
</style>
