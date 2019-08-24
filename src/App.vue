<template lang="pug">
#app.section
  .container
    menus
    notas
  </template>
<script>

import menus from './components/menus.vue'
import notas from './components/notas.vue'
import nuevaNota from './components/nueva_nota.vue'

export default {
  name: 'app',
  components: {
    menus,
    notas,
    nuevaNota
  }
}
</script>

<style lang="scss">
@import './styles/_main.scss';
</style>
