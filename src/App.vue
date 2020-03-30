<template lang="pug">
#app.container.is-fluid
  menus
  section.section
    notas
</template>
<script>

import menus from './layout/menus.vue'
import notas from './components/notas.vue'

export default {
  name: 'app',
  components: {
    menus,
    notas
  }
}
</script>
