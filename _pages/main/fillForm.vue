<template>
  <div id="formFillPage" class="layout-padding">
    <!--page Content-->
    <div id="formFillPageContent" class="row" >
      <!--Form info-->
      <div class="col-12">
        <!--Page Actions-->
        <div class="box box-auto-height" v-if="formData">
          <div class="row text-primary text-weight-bold ellipsis title-content items-center">
            <label id="title" v-if="formData.title">{{$tr('isite.cms.label.form')}} : {{ formData.title }}</label>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row justify-center q-mt-lg">
          <div class="
            col-xs-12
            col-sm-12
            col-md-10
            col-lg-8
            col-xl-6
          ">
            <dynamic-form
              v-model="form"
              v-bind="formData"
              :formId="formData.id"
              v-if="formData"
              @submit=""
            />
          </div>
        </div>
      </div>
    </div>
    <div>
      <p>DEV:</p>
        {{ formData }}
    </div>
    <!--Inner Loading-->
    <inner-loading :visible="loading"/>
  </div>
</template>

<script>
export default {
  props: {
    formId: {
      type: Number,
      default: null
    },
  },
  components: {},
  watch: {},
  mounted() {
    this.$nextTick(function () {
      this.init()
    })
  },
  data() {
    return {
      loading: false,
      formData: false,
      fields: [],      
      form: {}
    }
  },
  computed: {
    getFormId() {
        return this.$route.params.id || this.formId 
    }
  },
  methods: {
    init() {
      //Get form data
      this.getData(true)
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
        this.$crud.show('apiRoutes.qform.forms', this.getFormId, requestParams).then(response => {
          this.formData = response.data
          //formtype == 0
          this.formData.formType = this.formData.formType == 0 ? 'grid' : this.formData.formType
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
    }
  }
}
</script>
<style lang="stylus">
#formFillPageContent
  #title
    font-size 20px
</style>
