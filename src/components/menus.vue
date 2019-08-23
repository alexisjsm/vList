<template lang="pug">
  header#menus
    nav.navbar(role='navegation')
      .navbar-brand
        a(href='/' class="navbar-item title has-text-grey-dark") vList
        a(role="button" aria-label="menu" class="navbar-burger burger" @click="isActive = !isActive" :class="{'is-active':isActive}")
          span(aria-hidden="true" v-for="n in 3")

      div(class="navbar-menu" :class="{'is-active':isActive}")
        .navbar-end
          .navbar-item
            .buttons
              a.button.is-primary.is-outlined Nueva nota
</template>
<script>
export default {
  name: 'menus',
  data () {
    return {
      isActive: false
    }
  }
}
</script>

<style lang="scss" scoped>
.is-outlined{
  color: purple;
}
</style>
