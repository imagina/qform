<template>
  <div id="formfieldsPage" class="layout-padding">
    <!--Blocks Crud-->
    <crud :crud-data="import('@imagina/qform/_crud/blocks')" :custom-data="customCrudBlocks" type="no-index"
          ref="crudBlocks" @updated="getData(true)" @deleted="getData(true)" @created="getData(true)"/>
    <!--Fields Crud-->
    <crud :crud-data="import('@imagina/qform/_crud/fields')" :custom-data="customCrudFields" type="no-index"
          ref="crudFields" @deleted="getData(true)" @created="getData(true)"/>

    <!--page Content-->
    <div id="formfieldsPageContent" class="row q-col-gutter-md relative-position">
      <!--Form info-->
      <div class="col-12" v-if="formData">
        <!--Page Actions-->
        <div class="box box-auto-height">
          <page-actions :title="`${$tr('isite.cms.label.form')}: ${formData.title}`" :extra-actions="['new']"
                        @new="$refs.crudBlocks.create()"/>
        </div>
      </div>
      <!--Blocks content (draggable)-->
      <div class="col-12">
        <draggable @update="updateOrderBlock" @change="updateOrderBlock" :list="formData.blocks" group="bocksBlocks"
                   v-bind="dragOptions" v-model="formData.blocks"
                   style="min-height: 60px" class="list-group row q-col-gutter-md">
          <div v-for="block in formData.blocks" :key="block.id" class="block-content col-12 col-md-6 col-lg-4">
            <div class="box">
              <!--Block info-->
              <div class="block-info relative-position row justify-between items-center q-mb-md">
                <!--Block Title-->
                <div class="box-title col-12 q-py-sm q-pr-xl">
                  <div class="block-info-title ellipsis cursor-pointer">
                    <q-icon name="fas fa-arrows-alt"></q-icon>
                    {{ $tr('isite.cms.label.block') }} #{{ block.sortOrder }} | {{ block.title }}
                    <q-tooltip>{{ block.title }}</q-tooltip>
                  </div>
                </div>
                <!--Button action-->
                <div class="absolute-top-right">
                  <q-btn class="file-card-bottom-actionss" icon="fas fa-ellipsis-v" unelevated round flat
                         padding="sm" size="10px" color="blue-grey">
                    <!---Menu actions-->
                    <q-menu anchor="bottom left" self="bottom end">
                      <q-list style="min-width: 100px">
                        <q-item clickable v-close-popup v-for="(actionBlock, itemKey) in fileActionsBlock"
                                :key="itemKey" @click.native="actionBlock.action(block)">
                          <q-item-section>
                            <div class="row items-center">
                              <q-icon :name="actionBlock.icon" class="q-mr-sm" color="blue-grey" size="18px"/>
                              {{ actionBlock.label }}
                            </div>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
                <!--Block description-->
                <div class="block-info-description q-mt-xs col-12 ellipsis-3-lines">
                  {{ block.description }}
                  <q-tooltip>{{ block.description }}</q-tooltip>
                </div>
              </div>
              <!--Block Fields-->
              <div class="block-fields">
                <!--Fields Information-->
                <div class="row justify-between items-center">
                  <!--Title-->
                  <div class="box-title">{{ $trp('isite.cms.label.field') }}</div>
                  <!--Btn to create field-->
                  <q-btn @click="blockCreateField = block.id; $refs.crudFields.create()" icon="fas fa-plus"
                         color="green" padding="sm" size="10px" round unelevated>
                    <q-tooltip>{{ $tr('iforms.cms.newField') }}</q-tooltip>
                  </q-btn>
                </div>
                <div id="contentFields" class="q-mt-md">
                  <q-scroll-area :thumb-style="thumbStyle" :content-active-style="contentActiveStyle"
                                 style="height: 200px">
                    <!--Fields content (draggable)-->
                    <draggable @update="updateOrderField" @change="updateOrderField" :list="formData.fields"
                               group="bocksfields"
                               v-bind="dragOptions" v-model="block.fields" class="list-group block"
                               style="min-height: 199px; width: 100%">
                      <div v-for="(field, fieldkey) in block.fields" :key="field.id"
                           class="items-center cursor-pointer">
                        <!--Field-->
                        <div class="row justify-between items-center relative-position q-py-xs">
                          <!--Field title-->
                          <div class="ellipsis text-grey-9 q-mr-xl">
                            <q-icon class="cursor-pointer" name="fas fa-arrows-alt"/>
                            {{ field.label }}
                          </div>
                          <!--Field Actions-->
                          <q-btn class="absolute-top-right" icon="fas fa-ellipsis-v" unelevated round flat
                                 padding="sm" size="10px" color="blue-grey">
                            <!---Menu actions-->
                            <q-menu anchor="bottom left" self="bottom end">
                              <q-list style="min-width: 100px">
                                <q-item clickable v-close-popup v-for="(actionfield, itemKey) in fileActionsField"
                                        :key="itemKey" @click.native="actionfield.action(field)">
                                  <q-item-section>
                                    <div class="row items-center">
                                      <q-icon :name="actionfield.icon" class="q-mr-sm" color="blue-grey" size="18px"/>
                                      {{ actionfield.label }}
                                    </div>
                                  </q-item-section>
                                </q-item>
                              </q-list>
                            </q-menu>
                          </q-btn>
                          <!--Separator-->
                          <div class="col-12 q-my-xs">
                            <q-separator class="col-12 q-my-xs"/>
                          </div>
                        </div>
                      </div>
                    </draggable>
                  </q-scroll-area>
                </div>
              </div>
            </div>
          </div>
        </draggable>
      </div>
      <!--Inner Loading-->
      <inner-loading :visible="loading"/>
    </div>
  </div>
</template>

<script>
//import Component
import renderForm from '@imagina/qform/_components/frontend/forms/renderForm'
import formForm from '@imagina/qform/_components/admin/forms/form'
import draggable from 'vuedraggable'

export default {
  beforeDestroy() {
    this.$root.$off('page.data.refresh')
  },
  props: {},
  components: {
    draggable,
    renderForm,
    formForm
  },
  watch: {
    fields: function () {
      this.fields.forEach((element, index) => {
        element.order = index
      })
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.init()
    })
  },
  data() {
    return {
      loading: false,
      dragOptions: {
        animation: 200,
        disabled: false,
        ghostClass: "ghost"
      },
      formData: false,
      blockCreateField: false,
      fields: [],

      //Style of Scroll area
      thumbStyle: {
        right: '-11px',
        borderRadius: '5px',
        backgroundColor: '#555',
        width: '5px',
        opacity: 0.75,
      },
      contentActiveStyle: {
        color: 'black'
      }
    }
  },
  computed: {
    //Custom Crud blocks
    customCrudBlocks() {
      return {
        getDataForm: (data, typeForm) => {
          return new Promise((resolve, reject) => {
            //Transform data of created
            if (typeForm == 'create') {
              //asigned sortOrder
              data.sortOrder = this.formData.blocks ? (this.formData.blocks.length + 1) : 1
            }

            resolve(data)
          })
        },
      }
    },
    //Custom Crud fields
    customCrudFields() {
      return {
        getDataForm: (data, typeForm) => {
          return new Promise((resolve, reject) => {
            //Transform data of created
            if (typeForm == 'create') {
              //Set block ID
              data.blockId = this.blockCreateField
              //asigned order
              data.Order = this.formData.order ? (this.formData.order.length + 1) : 1
              //Set field name value
              data.name = this.$helper.getSlug(data[this.$store.state.qsiteApp.defaultLocale].label)
            }

            //Response
            resolve(data)
          })
        },
      }
    },
    //File Actions field
    fileActionsField() {
      return [
        {
          label: this.$tr('isite.cms.label.edit'),
          icon: 'fas fa-pen',
          color: 'green',
          action: (field) => {
            this.$refs.crudFields.update(field)
          }
        },
        {
          label: this.$tr('isite.cms.label.delete'),
          icon: 'fas fa-trash',
          color: 'red',
          action: (field) => {
            this.$refs.crudFields.delete(field)
          }
        }
      ]
    },
    //File Actions Block
    fileActionsBlock() {
      return [
        {
          label: this.$tr('isite.cms.label.edit'),
          icon: 'fas fa-pen',
          color: 'green',
          action: (block) => {
            this.$refs.crudBlocks.update(block)
          }
        },
        {
          label: this.$tr('isite.cms.label.delete'),
          icon: 'fas fa-trash',
          color: 'red',
          action: (block) => {
            this.$refs.crudBlocks.delete(block)
          }
        }
      ]
    },
  },
  methods: {
    init() {
      //Get form data
      this.getData(true)
      //Listen refresh page
      this.$root.$on('page.data.refresh', () => this.getData(true))
    },
    //Get form data
    getData(refresh = false) {
      return new Promise((resolve, reject) => {
        this.loading = true
        //request params
        let requestParams = {
          refresh: refresh,
          params: {
            include: 'blocks.fields'
          }
        }
        //Request
        this.$crud.show('apiRoutes.qform.forms', this.$route.params.id, requestParams).then(response => {
          this.formData = response.data
          this.loading = false
        }).catch(error => {
          this.$apiResponse.handleError(error, () => {
            this.loading = false
          })
        })
      })
    },

    //order data Fields
    getDataFields() {
      let response = []
      let formData = this.$clone(this.formData)

      //travel blocks
      formData.blocks.forEach(block => {
        //travel fields
        block.fields.forEach(field => {
          //assigned field `blockID`
          field.block_id = this.$clone(block.id)
          //assigned field `order`
          field.order = response.length + 1
          response.push(field)
        })
      })
      //Response
      return response
    },

    //update order field
    updateOrderField() {
      // return this.getDataFields()
      this.loading = true
      let dataFields = {attributes: this.getDataFields()}

      this.$crud.put('apiRoutes.qform.formFields', dataFields)
          .then(response => {
            this.$alert.success({message: `${this.$tr('isite.cms.message.recordUpdated')}`})
            this.loading = false
          })
          .catch(error => {
            this.loading = false
            this.$alert.error({message: this.$tr('isite.cms.message.errorRequest'), pos: 'bottom'})
          })
    },

    getDataBlock() {
      let response = []
      let formData = this.$clone(this.formData)
      //travel blocks
      formData.blocks.forEach(block => {
        block.sort_order = response.length + 1
        response.push(block)
      })
      //Response
      return response
    },
    //update order block
    updateOrderBlock() {
      this.loading = true
      let dataBlocks = {attributes: this.getDataBlock()}
      this.$crud.put('apiRoutes.qform.formBlocks', dataBlocks)
          .then(response => {
            this.$alert.success({message: `${this.$tr('isite.cms.message.recordUpdated')}`})
            this.loading = false
          })
          .catch(error => {
            this.loading = false
            this.$alert.error({message: this.$tr('isite.cms.message.errorRequest'), pos: 'bottom'})
          })
    }
  }
}
</script>
<style lang="stylus">
#formfieldsPageContent

  .block-content

    .block-info-description
      line-height 1.2
      font-size 14px
      text-align justify
      color $grey-8
      max-height 50px
      min-height 50px

  #contentFields
    border-style dotted
    border-width 1px
    boder-color #cccccc
    padding 7px 15px 7px 7px
</style>
