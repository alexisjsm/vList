<template lang="pug">
.columns.is-centered
  #notas.column
    .columns.multiline(v-if="notes.length>=1")
        .column.is-one-third(v-for="note in notes" :key="Math.random()")
            .hero.is-light
                .hero-body
                    div.container
                        h1.title.is-bold {{note.title}}
                        p {{note.content}}
    .columns.is-centered(v-else)
        .column.is-half
            .hero
                .hero-body
                    div.container.is-fuild
                        h1.title.is-bold No hay notas
</template>

<script>
export default {
  name: 'notas',
  data () {
    return {
      notes: [
        {
          title: 'Titulo 1',
          content: 'Labore occaecat in officia commodo ea esse anim reprehenderit anim officia voluptate. Veniam aliquip esse dolor do do ea. Dolore aute aliqua ex consectetur eu nisi sit. Adipisicing duis sint duis esse cillum sit ipsum. Nulla fugiat incididunt non velit laboris ex nisi minim consectetur excepteur veniam cupidatat irure reprehenderit. Eiusmod aliqua elit mollit eu qui qui dolore tempor elit laboris voluptate. Esse nisi occaecat aliquip consequat anim ex eiusmod ullamco duis.'
        },
        {
          title: 'Titulo 2',
          content: 'Labore occaecat in officia commodo ea esse anim reprehenderit anim officia voluptate. Veniam aliquip esse dolor do do ea. Dolore aute aliqua ex consectetur eu nisi sit. Adipisicing duis sint duis esse cillum sit ipsum. Nulla fugiat incididunt non velit laboris ex nisi minim consectetur excepteur veniam cupidatat irure reprehenderit. Eiusmod aliqua elit mollit eu qui qui dolore tempor elit laboris voluptate. Esse nisi occaecat aliquip consequat anim ex eiusmod ullamco duis.'
        },
        {
          title: 'Titulo 3',
          content: 'Labore occaecat in officia commodo ea esse anim reprehenderit anim officia voluptate. Veniam aliquip esse dolor do do ea. Dolore aute aliqua ex consectetur eu nisi sit. Adipisicing duis sint duis esse cillum sit ipsum. Nulla fugiat incididunt non velit laboris ex nisi minim consectetur excepteur veniam cupidatat irure reprehenderit. Eiusmod aliqua elit mollit eu qui qui dolore tempor elit laboris voluptate. Esse nisi occaecat aliquip consequat anim ex eiusmod ullamco duis.'
        }
      ]
    }
  }

}
</script>

<style lang="scss" scoped>
    #notas{
        .title{
          text-align: center;
        }
        .hero-body{
          padding: 1em;
        }
        .hero{
            border-radius: 5px 5px;
        }

    }
</style>
