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
                b-button(icon-right="trash-alt" size="is-small" @click="buttonRemoveItem({id: note.id , indexItem: valueList.name, list: note.list})")
      .content(v-else)
        p {{note.content}}
      .content(v-if="note.file!=null")
        img(:src="note.file")
    transition(name="fade")
      footer(v-show=" note.id === isSelected ")
        span.is-flex
          small.is-size-7.has-text-dark.has-text-left {{convertTimestap}}
        span
          .buttons
            b-button(type="is-danger" @click='buttonRemove' icon-right="trash-alt")
</template>

<script>
export default {
  name: 'Nota',
  props: {
    notePop: {
      type: Object,
      default: Object,
      require: true
    },
    isSelected: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      note: this.notePop,
      checked: []
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
    async buttonRemove () {
      const remove = await this.$store.dispatch('deleteNote', this.note.id)
      if (remove.message === 'Ok') {
        this.$buefy.toast.open({
          message: 'Nota borrada',
          type: 'is-success'
        })
      } else {
        this.$buefy.toast.open({
          message: 'Nota no borrada',
          type: 'is-danger'
        })
      }
    },
    buttonChecked (id) {
      this.$store.dispatch('changeStateListElement', id)
    },

    async buttonRemoveItem ({ id, indexItem, list }) {
      const infoItem = { id, indexItem, list }

      const removeItem = await this.$store.dispatch('removeIteamList', infoItem)
      if (removeItem.message === 'Ok') {
        this.$buefy.toast.open({
          message: 'Elemento borrado',
          type: 'is-success'
        })
      } else {
        this.$buefy.toast.open({
          message: 'Elemento no borrado',
          type: 'is-danger'
        })
      }
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
