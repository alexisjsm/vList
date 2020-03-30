<template lang="pug">
#menus
  b-navbar
    template(slot='brand')
      b-navbar-item
        h1.title VBoard
    template(slot='end')
      b-navbar-item(tag='div')
          .buttons
            a( class="button is-primary is-outlined"
              @click="newNote") Nueva nota
</template>
<script>
import nuevaNotas from '../components/modal/nuevaNotas.vue'
export default {
  name: 'menus',
  components: {
    nuevaNotas
  },
  methods: {
    newNote () {
      this.$buefy.modal.open({
        parent: this,
        component: nuevaNotas,
        hasModalCard: true,
        ariaRole: 'dialog',
        ariaModal: true,
        trapFocus: true,
        canCancel: false
      })
    }
  }
}
</script>

<style lang="scss" scoped>

#menus{
  .is-outlined{
    color: purple;
    border-color: purple;
  }
  .is-outlined:hover{
      color: #fff;
      background: purple;
  }
}
</style>
