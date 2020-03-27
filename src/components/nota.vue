<template lang="pug">
#nota.tile.is-parent(@click='selected')
  .tile.is-child.has-background-light.box
    header
        h1.title.is-bold {{note.title}}
    section
      .content(v-if="note.hasOwnProperty('list') && note.list.length >= 1")
        ul
          li(v-for='(valueList,indexList) in note.list' :key="indexList" )
              b-checkbox(:name="valueList['name']" v-model="valueList.type" @input="buttonChecked(note)" :native-value="valueList['type']")
                span {{valueList.name}}
              span
                b-button(icon-right="trash-alt" size="is-small")
      .content(v-else)
        p {{note.content}}
    transition(name="fade")
      footer(v-show=" note.id === isSelected ")
        span.is-flex
          small.is-size-7.has-text-dark.has-text-left {{convertTimestap}}
        span
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
  data () {
    return {
      note: this.notePop,
      checked: []
    }
  },
  props: {
    notePop: {
      type: Object,
      require: true
    },
    isSelected: {
      type: String
    }
  },
  computed: {
    convertTimestap () {
      let time = this.note.time.toDate()
      return time.toLocaleString()
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
    },
    buttonChecked (id) {
      console.log(id)
      this.$store.dispatch('changeStateListElement', id)
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

li>span{
  display: none;
  float: right;
}
.is-flex{
  justify-content: right;
}

</style>
