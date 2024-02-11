export default {
  forms: {
    permission: 'iforms.forms.manage',
    activated: true,
    path: '/form/form',
    name: 'qform.admin.form.index',
    crud: import('modules/qform/_crud/crudForms'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'iforms.cms.sidebar.adminForm',
    icon: 'fa-light fa-clipboard-list-check',
    authenticated: true,
    subHeader: {
      refresh: true
    }
  },
  formsDesign: {
    permission: null,
    activated: true,
    path: '/form/form/:id',
    name: 'qform.admin.form.design',
    page: () => import('modules/qform/_pages/admin/forms/design'),
    layout: () => import('layouts/master.vue'),
    title: 'iforms.cms.sidebar.designForm',
    icon: 'fa-light fa-clipboard-list-check',
    authenticated: true
  },
  fields: {
    permission: 'iforms.fields.manage',
    activated: true,
    path: '/form/fields/:id',
    name: 'qform.admin.fields.index',
    page: () => import('modules/qform/_pages/admin/fields/index'),
    layout: () => import('layouts/master.vue'),
    title: 'iforms.cms.sidebar.adminField',
    icon: 'fas fa-grip-horizontal',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb: ['qform.forms']
    }
  },
  fieldsCreate: {
    permission: null,
    activated: true,
    path: '/form/fields/create/:formId',
    name: 'qform.admin.fields.create',
    page: () => import('modules/qform/_pages/admin/fields/form'),
    layout: () => import('layouts/master.vue'),
    title: 'iforms.cms.newField',
    icon: 'fas fa-grip-horizontal',
    authenticated: true,
    subHeader: {
      refresh: true
    }
  },
  fieldsUpdate: {
    permission: null,
    activated: true,
    path: '/form/fields/:id/update',
    name: 'qform.admin.fields.update',
    page: () => import('modules/qform/_pages/admin/fields/form'),
    layout: () => import('layouts/master.vue'),
    title: 'iforms.cms.updateField',
    icon: 'fas fa-grip-horizontal',
    authenticated: true,
    subHeader: {
      refresh: true
    }
  },
  leads: {
    permission: 'iforms.leads.manage',
    activated: true,
    path: '/form/lead',
    name: 'qform.admin.leads.index',
    crud: import('modules/qform/_crud/crudLeads'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'iforms.cms.sidebar.adminLead',
    icon: 'fa-light fa-clipboard-check',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb: ['qform.forms']
    }
  },
  leadsShow: {
    permission: null,
    activated: true,
    path: '/form/lead/:id',
    name: 'qform.admin.leads.show',
    page: () => import('modules/qform/_pages/admin/leads/show'),
    layout: () => import('layouts/master.vue'),
    title: 'iforms.cms.sidebar.adminLead',
    icon: 'fa-light fa-clipboard-check',
    authenticated: true
  },
}
