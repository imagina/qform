<template>
  <div id="formFillPage" class="layout-padding">
    <!--page Content-->
    <div id="formFillPageContent" class="row" >
      <div class="col-12">
        <div class="row justify-center">
          <div class="
            col-xs-12
            col-sm-12
            col-md-10
            col-lg-8
            col-xl-6
          ">
            <!--Form title-->
            <div class="box box-auto-height" v-if="title">
              <div class="row text-primary text-weight-bold ellipsis title-content items-center">
                <label id="formFillPageTitle">{{$tr('isite.cms.label.form')}} : {{ title }}</label>
              </div>
            </div>
            <!--Form info-->
            <div class="q-mt-lg">
              <dynamic-form
                v-bind="formData"
                formType="grid"
                :formId="getFormId"
                :send-to="{apiRoute: 'apiRoutes.qform.leads', extraData: { formId : getFormId}}"
                withFeedBack
                @obtainedForm="onObtainedForm"
                @newForm="reset"
              />
            </div>
          </div>
        </div>
      </div>
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
      title: false,
      formData: false,
      form: {}
    }
  },
  computed: {
    getFormId() {
        return this.$route.params.id || this.formId 
    }
  },
  methods: {
    init() {},
    reset() {
      this.formData = false;
    },
    onObtainedForm(data){
      this.formData = data
      this.title = this.formData.title
    }
  }
}
</script>
<style lang="stylus">
#formFillPageTitle
  font-size 20px
</style>
