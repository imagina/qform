<template>
      <master-modal
      v-model="showModal"
      :persistent="true"
      title="Edición de Formulario (PT)"
      :maximized="$q.screen.lt.md"
      custom-position
      modalWidthSize="98%"
      @hide="handleCloseModal"
    >
       <form-crud :formId="formId" />
    </master-modal>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import controller from 'modules/qform/_components/editFormModal/controller'
import formCrud from 'modules/qform/_pages/admin/fields/index.vue'

export default defineComponent({
  props: {},
  components: {formCrud},
  setup(props, {emit}) {
    return controller(props, emit)
  }
})
</script>
<style lang="scss">
</style>
