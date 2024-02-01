import {getCurrentInstance} from 'vue'

export const customProps = () => {
  const proxy = getCurrentInstance()!.appContext.config.globalProperties

  return {
    update: {
      description: proxy.$tr('iforms.cms.message.fieldEditingModalbanner'),
      customFormProps: {
        type: {
          props: {
            readonly: true
          },
        },
        entity: {
          props: {
            readonly: true
          }
        },
        max: {
          props: {
            readonly: true
          }
        },
        min: {
          props: {
            readonly: true
          }
        },
        maxlength: {
          props: {
            readonly: true
          }
        },
        mimes: {
          props: {
            readonly: true
          }
        },
        required: {
          props: {
            readonly: true,
            disabled: true
          }
        }
      }
    },
  }
}
