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
            col-xl-8
          ">
            <!--Form title-->
            <div class="box box-auto-height">
              <div class="row text-primary text-weight-bold title-content items-center">
                <div class="col-11 ellipsis">
                  <label id="formFillPageTitle">{{$tr('isite.cms.label.form')}} : {{ title }}</label>
                </div>
                <div class="col-1">
                  <share-link
                    v-if="formData"
                    showIcon="true"
                    :url="formData.url"
                    :embed="formData.embed"
                  />
                </div>
              </div>
            </div>
            <!--Form info-->
            <div class="q-mt-lg">
              <dynamic-form
                v-if="getFormId"
                formType="grid"
                :formId="getFormId"
                :send-to="{apiRoute: 'apiRoutes.qform.leads', extraData: { formId : getFormId}}"
                withFeedBack
                @obtainedForm="onObtainedForm"
                :useCaptcha="useCaptcha"
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
      title: '',
      formData: false
    }
  },
  computed: {
    getFormId() {
      return this.$route.params.id || this.formId
    },
    getIframeId(){
      return this.$route.query.formElementId || false
    },
    useCaptcha(){
      return this.$route.meta.useCaptcha || false
    }
  },
  methods: {
    init() {},
    onObtainedForm(data){
      this.title = data.title ? data.title : ''
      this.formData = data.url && data.embed ?  data : false
      if(this.getIframeId){
        this.setParentHeight()
      }
    },
    copyUrl(){
      this.$helper.copyToClipboard(window.location.href, 'isite.cms.messages.copyToClipboard')
    },
    setParentHeight(){
      this.loading = true
      setTimeout(() => {
        const message = {
          offsetHeight: document.body.offsetHeight,
          clientHeight: document.body.clientHeight,
          scrollHeight: document.body.scrollHeight,
          formElementId: this.getIframeId
        }
        window.parent.postMessage(message, '*')
        this.loading = false
      }, 600)
    }
  }
}
</script>
<style lang="scss">
#formFillPageTitle {
  font-size: 20px;
}
</style>
