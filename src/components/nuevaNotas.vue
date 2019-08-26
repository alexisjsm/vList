<template lang="pug">
#nueva-nota.modal(:class="{'is-active':showNewNota}")
    .modal-background
    .modal-card
        header.modal-card-head
            p.modal-card-title
            button.delete(@click="closed")
        section.modal-card-body
            .field
                .control
                    input(type="text" class="input" placeholder="Titulo")
                .control
                    textarea(class="textarea" placeholder="Nota")
            footer.modal-card-footer
                .field.is-grouped
                    .control
                        button.button.is-link Guardar
                    .control
                        button.button.is-danger Borrar

</template>

<script>
export default {
  name: 'nueva-nota',
  data () {
    return {
      showNewNota: this.isActive
    }
  },
  props: {
    isActive: {
      type: Boolean
    }
  },
  methods: {
    closed () {
      console.log('Haciendo click en closedme')
      console.log(`this.showNewNota es ${this.showNewNota}`)
      this.showNewNota = false
      this.$bus.$emit('closedMe', this.showNewNota)
      console.log(`this.showNewNota ahora es ${this.showNewNota}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.control {
  margin-bottom: 10px;
}
.hero {
  border-radius: 10px 10px;
}
.hero-body {
  padding: 0.7em;
}
</style>
