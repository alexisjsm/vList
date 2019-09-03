<template lang="pug">
#nota(@click='selected')
    header.hero-head
      .container
        h1.title.is-bold {{note.title}}
    .hero-body
      .container
        p {{note.content}}
      footer.hero-foot(v-show=" note.id === isSelected ")
        .buttons
          button.button.is-danger(@click='removed') Borrar

</template>

<script>
import nota from './nota.vue'
export default {
  name: 'nota',
  components: {
    nota
  },
  props: {
    note: {
      type: Object,
      require: true
    },
    isSelected: {
      type: Number
    }
  },
  methods: {
    selected () {
      this.$emit('selected', this.note.id)
    },
    removed () {
      this.$bus.$emit('removed', this.note.id)
    }
  }
}
</script>

<style lang="scss" scoped>
    #nota{
        .title{
          text-align: center;
        }
        .hero-body{
          padding: 1em;
          .container{
            margin-bottom: 1.5em;
          }
        }
    }
</style>
