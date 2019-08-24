<template lang="pug">
    #nueva-nota
        section.section
            .columns
                .column.is-medium
                    form
                        .field
                            .control
                                input(type="text" class="input" placeholder="Titulo")
                            .control
                                textarea(class="textarea" placeholder="Nota")
                        .field.is-grouped
                            .control
                                button.button.is-link Guardar
                            .control
                                button.button.is-danger Borrar

</template>

<script>
export default {
  name: 'nueva-nota'
}
</script>

<style lang="scss">

</style>
