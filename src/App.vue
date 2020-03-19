<template lang="pug">
#app.container.is-fluid
  menus
  transition(name="fade" mode="in-out")
    nueva-nota(v-if="mostrar"  :isActive="mostrar")
  section.section
    notas
</template>
<script>

import menus from './layout/menus.vue'
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
