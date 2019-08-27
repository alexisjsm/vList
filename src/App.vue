<template lang="pug">
#app.section
  .container
    menus
    nueva-nota(v-if="mostrar"  :isActive="mostrar")
    notas
</template>
<script>

import menus from './components/menus.vue'
import notas from './components/notas.vue'
import NuevaNota from './components/nuevaNotas.vue'

export default {
  name: 'app',
  components: {
    menus,
    NuevaNota,
    notas
  },
  data () {
    return {
      mostrar: false
    }
  },

  created () {
    this.$bus.$on('newNotes', (showNewNota) => {
      console.log(`creando`)
      this.mostrar = showNewNota
      console.log(`this.mostrar ahora es ${this.mostrar}`)
    })
  },
  mounted () {
    this.$bus.$on('closedMe', (showNewNota) => {
      console.log(`montando`)
      this.mostrar = showNewNota
      console.log(`this.mostrar ahora es ${this.mostrar}`)
    })
  }
}
</script>

<style lang="scss">
@import './styles/_main.scss';
</style>
