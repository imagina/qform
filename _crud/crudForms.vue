<template>
</template>
<script>
export default {
  data() {
    return {
      crudId: this.$uid(),
    }
  },
  methods: {
    createChildForm(parent) {
      const title = parent.title
      const name = `${title} (hijo)`
      this.$alert.info({
        mode: 'modal',
        message: `${this.$tr('isite.cms.label.wantToCreateAChildForm', { title })}`,
        actions: [
          {
            label: this.$tr('isite.cms.label.cancel'),
            color: 'grey',
          },
          {
            label: this.$tr('isite.cms.label.create'),
            color: 'green',
            handler: async () => {
              return new Promise((resolve, reject) => {
                const requestData = {
                  title: name,
                  system_name: name,
                  parentId: parent.id,
                  active: 1,
                }
                this.$crud.create('apiRoutes.qform.forms', requestData)
                  .then(response => {
                    resolve(true)
                    const { data: { id } } = response
                    const path = {
                      name: 'qform.admin.fields.index',
                      params: { id }
                    }
                    this.$router.push(path)
                  }).catch(err => {
                    reject(err)
                  })
              })
            }
          }
        ]
      })
    }
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        entityName: config("main.qform.entityNames.form"),
        apiRoute: 'apiRoutes.qform.forms',
        permission: 'iforms.forms',
        extraFormFields: 'iforms.crud-fields.forms',
        create: {
          title: this.$tr('iforms.cms.newForm'),
        },
        read: {
          columns: [
            {
              name: 'id', 
              label: this.$tr('isite.cms.form.id'), 
              field: 'id', 
              style: 'width: 50px', 
              align: 'left', 
            },
            {
              name: 'title', 
              label: this.$tr('isite.cms.form.title'), 
              field: 'title', align: 'left',
              action: (item) => { 
                this.$router.replace({ path: `/form/fields/${item.id}/` }) 
              }
            },
            {name: 'slug', label: this.$tr('isite.cms.form.slug'), field: 'systemName', align: 'left'},
            {name: 'active', label: this.$tr('isite.cms.form.status'), field: 'active', align: 'left'},
            {
              name: 'user', label: this.$tr('isite.cms.label.user'), field: 'user', align: 'left',
              format: val => (val && val.fullName) ? val.fullName : '-'
            },
            {
              name: 'parent', label: this.$tr('isite.cms.form.parent'), field: 'parent', align: 'left',
              format: val => (val && val.title) ? val.title : '-'
            },
            {
              name: 'destinationEmail',
              label: this.$trp('isite.cms.label.email'),
              field: 'destinationEmail',
              align: 'left',
              classes: 'ellipsis',
              style: 'max-width : 250px',
              format: val => val ? val.join(', ') : '-'
            },

            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'right'},
          ],
          requestParams: {include: 'user,parent,qrs'},
          filters: {
            userId: {
              value: null,
              type: 'select',
              props: {
                label: this.$tr('isite.cms.label.user'),
                options: [
                  {label: this.$tr('isite.cms.label.all'), value: '0'}
                ],
              },
              loadOptions: {
                apiRoute: 'apiRoutes.quser.users',
                select: {label: 'fullName', id: 'id'},
              }
            }
          },
          actions: [
            {
              icon: 'fa-light fa-diagram-subtask',
              action: this.createChildForm,
              color: 'info',
              label: this.$tr('isite.cms.label.createChildForm'),
              format: form => {
                return {
                  vIf: !form.parent
                }
              },
            },
            {
              icon: "fa-light fa-clipboard-list-check",
              color: 'info',
              route: 'qform.main.leads.create',
              label: this.$tr('iforms.cms.fillForm'),
            },
          ]
        },
        update: {
          title: this.$tr('iforms.cms.updateForm'),
          to:  'qform.admin.fields.index',
        },
        delete: true,
        formLeft: {
          id: {value: ''},
          title: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.title')}*`,
              rules: [val => !!val || this.$tr('isite.cms.message.fieldRequired')],
            }
          },
          description: {
            name : "description",
            value: '',
            type: 'html',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.description')}`,
            }
          },
          active: {
            value: '1',
            type: 'select',
            props: {
              label: this.$tr('isite.cms.form.status'),
              options: [
                {label: this.$tr('isite.cms.label.enabled'), value: '1'},
                {label: this.$tr('isite.cms.label.disabled'), value: '0'}
              ]
            },
          },
          destinationEmail: {
            value: null,
            type: 'select',
            props: {
              label: `${this.$tr('isite.cms.label.email')}`,
              useInput: true,
              useChips: true,
              multiple: true,
              hideDropdownIcon: true,
              inputDebounce: "0",
              newValueMode: "add-unique",
              outlined: true,
              dense: true,
            }
          },
          userId: {
            value: null,
            type: 'select',
            props: {
              label: this.$tr('isite.cms.label.user'),
              clearable: true,
            },
            loadOptions: {
              apiRoute: 'apiRoutes.quser.users',
              select: {label: 'fullName', id: 'id'},
            }
          },
          urlTermsAndConditions: {
            value: null,
            type: 'input',
            isFakeField: true,
            props: {
              label: `${this.$tr('iforms.cms.form.urlTermsAndConditions')}`,
            }
          },
        },
        formRight: {
          successText: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('iforms.cms.form.successText')}`,
              type: 'textarea',
              rows: "3",
            },
          },
          submitText: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('iforms.cms.form.submitText')}`,
              type: 'textarea',
              rows: "3",
            },
          },
          replyTo: {
            value: null,
            type: 'select',
            isFakeField: true,
            props: {
              vIf: this.crudInfo.typeForm === 'update',
              label: this.$tr('iforms.cms.replyTo')
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qform.fields',
              requestParams: {filter: {formId: this.crudInfo.id}},
              select: {label: 'name', id: 'id'}
            }
          },
          replyToName: {
            value: null,
            type: 'select',
            isFakeField: true,
            props: {
              vIf: this.crudInfo.typeForm === 'update',
              label: this.$tr('iforms.cms.replyToName')
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qform.fields',
              requestParams: {filter: {formId: this.crudInfo.id}},
              select: {label: 'name', id: 'id'}
            }
          },
          parentId: {
            value: '',
            type: 'select',
            props: {
              label: 'Formulario padre',
              clearable: true,
              readonly: this.crudInfo.typeForm === 'update'
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qform.forms',
              requestParams: {
                filter: {
                  parentId: null
                }
              },
              select: {
                label: 'title', 
                id: 'id'
              },
            }
          },
        },
        getDataForm: (data, typeForm) => {
          return new Promise((resolve, reject) => {
            if (typeForm === 'create') {
              let defaultLocale = this.$store.state.qsiteApp.defaultLocale
              let formTitle = data[defaultLocale].title
              data.systemName = this.$helper.getSlug(formTitle)
            }
            resolve(data)
          })
        },
        events: {
          createdSon: (id) => {
            const path = {
              name: 'qform.admin.fields.index',
              params: {
                id
              }
            }
            this.$router.push(path)
          },
        },
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  }
}
</script>
