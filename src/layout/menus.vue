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
              a.button.is-primary.is-outlined(@click="NewNotas") Nueva nota
</template>
<script>
export default {
  name: 'menus',
  data () {
    return {
      isActive: false,
      showNewNota: false
    }
  },
  methods: {
    NewNotas () {
      console.log(this.showNewNota)

      this.showNewNota = true
      this.$bus.$emit('newNotes', this.showNewNota)
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
