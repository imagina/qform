<template></template>
<script>
export default {
  data() {
    return {
      fields: {
        formId: this.$route.params.formId,
      },
      crudId: this.$uid()
    }
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        entityName: config("main.qform.entityNames.field"),
        apiRoute: 'apiRoutes.qform.fields',
        permission: 'iforms.fields',
        extraFormFields: 'iforms.crud-fields.fields',
        create: {
          title: this.$tr('iforms.cms.newField'),
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
            {name: 'typeName', label: this.$tr('isite.cms.form.type'), field: 'typeName'},
            {name: 'label', label: this.$tr('iforms.cms.form.label'), field: 'label'},
            {name: 'order', label: this.$tr('iforms.cms.form.order'), field: 'order'},
            {
              name: '_form.vue', label: this.$tr('iforms.cms.form.form'), field: '_form.vue',
              format: val => (val && val.title) ? val.title : '-'
            },
            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'right'},
          ],
          requestParams: {
            filter: {
              formId: this.$route.params
            },
            include: '_form.vue'
          },
        },
        update: {
          title: this.$tr('iforms.cms.updateField'),
          requestParams: {include: 'fields'}
        },
        delete: true,
        formLeft: {
          id: {value: ''},
          formId: {
            value: this.$route.params.id
          },
          blockId: {
            value: this.$route.params.blockId
          },
          label: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('iforms.cms.form.label')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            }
          },
          placeholder: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: this.$tr('iforms.cms.form.placeholder'),
            }
          },
          description: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: this.$tr('isite.cms.form.description')
            }
          },
          width: {
            value: 12,
            type: 'select',
            props: {
              label: this.$tr('isite.cms.form.width'),
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              options: [
                {value: 12, label: this.$tr('iforms.cms.form.columns.full')},
                {value: 9, label: this.$tr('iforms.cms.form.columns.nine')},
                {value: 8, label: this.$tr('iforms.cms.form.columns.eight')},
                {value: 6, label: this.$tr('iforms.cms.form.columns.six')},
                {value: 4, label: this.$tr('iforms.cms.form.columns.four')},
                {value: 3, label: this.$tr('iforms.cms.form.columns.three')},
              ],
            },
          },
          type: {
            value: 1,
            type: 'select',
            props: {
              label: `${this.$tr('isite.cms.form.type')} ${this.$tr('isite.cms.label.field')}`,
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qform.types',
              select: {label: 'name', id: 'id'},
              requestParams: {include: 'parent'}
            }
          },
          visibility: {
            value: 'full',
            type: 'select',
            props: {
              label: 'Visibilidad',
              options: [
                { label: 'Visible siempre', value: 'full' },
                { label: 'Visible sólo en el administrador', value: 'internal' },
                { label: 'Visible sólo en la Web', value: 'internalHidden' },
              ]
            },
          },
          fieldOptions: {
            value: [],
            type: 'select',
            isTranslatable: true,
            props: {
              label: this.$trp('isite.cms.form.option'),
              useInput: true,
              useChips: true,
              multiple: true,
              hideDropdownIcon: true,
              inputDebounce: "0",
              newValueMode: "add-unique",
              vIf: ([5, 6, 8].indexOf(parseInt(this.crudInfo.type || 0)) != -1) ? true : false,
              hint: this.$tr('iforms.cms.message.helpToOptionsField')
            }
          },
        },
        formRight: {
          icon: {
            value: null,
            type: 'selectIcon',
            isFakeField: true
          },
          prefixType: {
            name: 'type',
            value: '',
            type: 'select',
            fakeFieldName: 'prefix',
            props: {
              label: `${this.$tr('isite.cms.form.type')} ${this.$tr('isite.cms.form.prefix')}`,
              options: [
                {value: 'icon', label: this.$tr('isite.cms.form.icon')},
                {value: 'text', label: this.$tr('isite.cms.label.text')}
              ],
            }
          },
          prefixText: {
            name: 'text',
            value: '',
            type: 'input',
            fakeFieldName: 'prefix',
            props: {
              label: this.$tr('isite.cms.form.prefix'),
              vIf: (this.crudInfo.prefix && this.crudInfo.prefix.type) ? true : false
            }
          },
          suffixType: {
            name: 'type',
            value: '',
            type: 'select',
            fakeFieldName: 'suffix',
            props: {
              label: `${this.$tr('isite.cms.form.type')} ${this.$tr('isite.cms.form.suffix')}`,
              options: [
                {value: 'icon', label: this.$tr('isite.cms.form.icon')},
                {value: 'text', label: this.$tr('isite.cms.label.text')}
              ],
            }
          },
          suffixText: {
            name: 'text',
            value: '',
            type: 'input',
            fakeFieldName: 'suffix',
            props: {
              label: this.$tr('isite.cms.form.suffix'),
              vIf: (this.crudInfo.suffix && this.crudInfo.suffix.type) ? true : false
            }
          },
          required: {
            value: false,
            type: 'checkbox',
            props: {
              label: this.$tr('isite.cms.form.required'),
            }
          },
        }
      }
    },

    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  }
}
</script>
