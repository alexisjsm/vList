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
          button.button.is-danger(@click='removed')
            span
              font-awesome-icon(icon="trash-alt")

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
      .hero-head{
        .container{
          .title{
            text-align: center;
            padding: .3em;
        }
      }
    }
        .hero-body{
          padding: .3em;
          .container{
            margin-bottom: 1.5em;
            .title{
               text-align: center;
               padding: .3em;
            }
            p {
              white-space: pre-line;
            }
          }
        }
    }
</style>
