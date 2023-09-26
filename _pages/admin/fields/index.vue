<template>
  <div id="formfieldsPage" class="layout-padding">
    <!--Blocks Crud-->
    <crud 
      :crud-data="import('@imagina/qform/_crud/blocks')" 
      :custom-data="customCrudBlocks" 
      type="no-index"
      ref="crudBlocks" 
      @updated="getData(true)" 
      @deleted="getData(true)" 
      @created="getData(true)"
    />
    <!--Fields Crud-->
    <crud 
      :crud-data="import('@imagina/qform/_crud/fields')" 
      :custom-data="customCrudFields" type="no-index"
      ref="crudFields" 
      @deleted="getData(true)" 
      @created="getData(true)"
    />

    <!--page Content-->
    <div 
      id="formfieldsPageContent" 
      class="row q-col-gutter-md relative-position"
    >
      <!--Form info-->
      <div class="col-12" v-if="formData">
        <!--Page Actions-->
        <div class="box box-auto-height">
          <page-actions 
            :title="`${$tr('isite.cms.label.form')}: ${formData.title}`" 
            :extra-actions="['new']"
            @new="$refs.crudBlocks.create()"
          />
      </div>
    </div>

      <!--Blocks content (draggable)-->
      <div class="col-12">
        <draggable
          @update="handleOrdenBlock" 
          @change="handleOrdenBlock"
          :list="formData.blocks" 
          group="bocksBlocks"
          v-bind="dragOptions"
          v-model="formData.blocks"
          style="min-height: 60px" 
          class="list-group row q-col-gutter-md"
        >
          <formBlock 
            v-for="block in formData.blocks" 
            :key="block.id"
            :block="block"
            :form-data="formData"
            :refs="$refs"
            :block-create-field="blockCreateField"
            @handleCreateField="handleCreateField"
            @handleOrdenField="handleOrdenField"
          />
          
        </draggable>
      </div>
      <!--Inner Loading-->
      <inner-loading :visible="loading"/>
    </div>
  </div>
</template>

<script>
import formBlock from './formBlock.vue'
import draggable from 'vuedraggable'
import { getBlocks, updateOrderBlock, updateOrderField } from '@imagina/qform/services/form.service'
import { filterByBlock, filterByField } from '@imagina/qform/utilities/'
import Vue, { watch, ref, computed, onMounted, nextTick, getCurrentInstance } from 'vue'

export default {
  components: {
    formBlock,
    draggable,
  },
  beforeDestroy() {
    Vue.prototype.$root.$off('page.data.refresh')
  },
  mounted() {
    Vue.prototype.$nextTick(function () {
      Vue.prototype.init()
    })
  },
  setup() {
    const loading = ref(false)
    const dragOptions = ref({
      animation: 200,
      disabled: false,
      ghostClass: "ghost"
    })
    const formData = ref(false)
    const blockCreateField = ref(null)
    const fields = ref([])
    const proxy = (getCurrentInstance()).proxy;

    onMounted(() => {
      nextTick(() => {
        getData(true)
 
        
       //Listen refresh page
       getCurrentInstance()

       console.log(proxy)
      //  proxy(
      //    'page.data.refresh', 
      //    () => getData(true)
      //  )
      })
    })

    watch(fields, () => {
      fields.forEach((element, index) => {
        element.order = index
      })
    })

    const getData = async (refresh = false) => {
      loading.value = true
      const id = Vue.prototype.$route.params.id

      getBlocks({ id, refresh })
        .then(response => {
          formData.value = response.data
        }).catch(err => {
          console.log({err})
          Vue.prototype.$apiResponse.handleError(err, () => {})
        }).finally(() => {
          loading.value = false
        })
    }

    const handleOrdenField = async () => {
      loading.value = true
      const dataFields = { attributes: filterByField({ form }) }
      console.log('filterByField', filterByField({ form }))

      updateOrderField({ dataFields })
        .then(() => {
          Vue.prototype.$alert.success({
            message: `${Vue.prototype.$tr('isite.cms.message.recordUpdated')}`
          })
        }).catch(() => {
          Vue.prototype.$alert.error({
            message: Vue.prototype.$tr('isite.cms.message.errorRequest'), 
            pos: 'bottom'
          })
        }).finally(() => {
          loading.value = false
        })
    }

    const handleCreateField = (block) => {
      blockCreateField.value = block.id 
      Vue.prototype.$refs.crudFields.create()
    }

    const handleOrdenBlock = () => {
      loading.value = true
      const form = Vue.prototype.$clone(formData.value)
      const dataBlocks = { attributes: filterByBlock({ form }) }
      console.log('filterByBlock', filterByBlock({ form }))

      const REFERENCE_UPDATED_RECORDS_MESSAGE = 'isite.cms.message.recordUpdated'
      const REFERENCE_REQUEST_ERROR_MESSAGE = 'isite.cms.message.errorRequest'

      updateOrderBlock({ dataBlocks })
        .then(() => {
          Vue.prototype.$alert.success({ 
            message: `${Vue.prototype.$tr(REFERENCE_UPDATED_RECORDS_MESSAGE)}` 
          })
        }).catch(() => {
          Vue.prototype.$alert.error({
            message: Vue.prototype.$tr(REFERENCE_REQUEST_ERROR_MESSAGE), pos: 'bottom'
          })
        }).finally(() => {
          loading.value = false
        })
    }

     //Custom Crud blocks
    const customCrudBlocks = computed(() => {
      return {
        getDataForm: (data, typeForm) => {
          return new Promise(resolve => {

            //Transform data of created
            if (typeForm == 'create') {

              //asigned sortOrder
              data.sortOrder = formData.value.blocks 
                ? (formData.value.blocks.length + 1) 
                : 1
            }

            resolve(data)
          })
        },
      }
    })

    const customCrudFields = computed(() => {
      return {
        getDataForm: (data, typeForm) => {
          return new Promise((resolve) => {

            //Transform data of created
            if (typeForm == 'create') {

              //Set block ID
              data.blockId = blockCreateField

              //asigned order
              data.Order = formData.value.order 
                ? (formData.value.order.length + 1) 
                : 1

              //Set field name value
              data.name = Vue.prototype.$helper.getSlug(
                data[Vue.prototype.$store.state.qsiteApp.defaultLocale].label
              )
            }

            //Response
            resolve(data)
          })
        },
      }
    })

    return {
      loading,
      dragOptions,
      formData,
      blockCreateField,
      customCrudBlocks,
      customCrudFields,
      init,
      handleOrdenField,
      handleCreateField,
      handleOrdenBlock
    }
  }
}
</script>
