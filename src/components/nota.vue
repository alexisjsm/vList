<template lang="pug">
#nota(@click='selected')
    header.hero-head
      .content
        h1.title.is-bold {{note.title}}
    .hero-body
      .content(v-show="note.contentList.length >= 1")
        ul
          li(v-for='(n,index) in note.contentList' :key="index") {{n}}
      .content
        p {{note.content}}
      transition(name="fade")
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
        .content {
          .title{
            text-align: center;
            padding: .2em;
        }
      }
    }
        .hero-body{
          padding: .3em;
          .content {
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
