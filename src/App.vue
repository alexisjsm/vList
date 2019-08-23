<template lang="pug">
#app.section
  .container
    menus
    notas
  </template>
<script>

import menus from './components/menus.vue'
import notas from './components/notas.vue'

export default {
  name: 'app',
  components: {
    menus,
    notas
  }
}
</script>

<style lang="scss">
@import './styles/_main.scss';
</style>
