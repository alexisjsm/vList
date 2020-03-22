<template lang="pug">
#nota.tile.is-parent(@click='selected')
  .tile.is-child.has-background-light.box
    header
        h1.title.is-bold {{note.title}}
    section
      .content(v-if="note.hasOwnProperty('list') && note.list.length >= 1")
        ul
          li(v-for='(n,index) in note.list' :key="index")
            b-checkbox(:native-value="n") {{n}}
            span
              b-button(icon-right="trash-alt" size="is-small")
      .content(v-else)
        p {{note.content}}
    transition(name="fade")
      footer(v-show=" note.id === isSelected ")
        .buttons
          b-button(type="is-danger" @click='buttonRemove' icon-right="trash-alt")
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
    buttonRemove () {
      const remove = this.$store.dispatch('deleteNote', this.note.id)
      remove
        .then(() => {
          this.$buefy.toast.open({
            message: 'Nota borrada',
            type: 'is-success'
          })
        })
        .catch(() => {
          this.$buefy.toast.open({
            message: 'Nota no borrada',
            type: 'is-danger'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>

header,section,footer{
  margin-bottom: 1rem;
}

.content ul, li {
  padding: 0;
  margin: 0;
  list-style: none;
}

li:hover>span{
  display: block;
}

li span{
  display: none;
  float: right;

}

</style>
