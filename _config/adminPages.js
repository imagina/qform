export default {
  forms: {
    permission: 'iforms.forms.manage',
    activated: true,
    path: '/form/form',
    name: 'qform.admin.form.index',
    crud: import('@imagina/qform/_crud/crudForms'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
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
    page: () => import('@imagina/qform/_pages/admin/forms/design'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'iforms.cms.sidebar.designForm',
    icon: 'fa-light fa-clipboard-list-check',
    authenticated: true
  },
  fields: {
    permission: 'iforms.fields.manage',
    activated: true,
    path: '/form/fields/:id',
    name: 'qform.admin.fields.index',
    page: () => import('@imagina/qform/_pages/admin/fields/index'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'iforms.cms.sidebar.adminField',
    icon: 'fas fa-grip-horizontal',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb: ['qform.forms']
    }
  },
  inheritFields: {
    permission: null,
    activated: true,
    path: '/form/fields/inherit/:formId',
    name: 'qform.admin.fields.inherit',
    page: () => import('@imagina/qform/_pages/admin/inheritFields/Index.vue'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'iforms.cms.newField',
    icon: 'fas fa-grip-horizontal',
    authenticated: true,
    subHeader: {
      refresh: true
    }
  },
  fieldsCreate: {
    permission: null,
    activated: true,
    path: '/form/fields/create/:formId',
    name: 'qform.admin.fields.create',
    page: () => import('@imagina/qform/_pages/admin/fields/form'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
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
    page: () => import('@imagina/qform/_pages/admin/fields/form'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
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
    crud: import('@imagina/qform/_crud/crudLeads'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
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
    page: () => import('@imagina/qform/_pages/admin/leads/show'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'iforms.cms.sidebar.adminLead',
    icon: 'fa-light fa-clipboard-check',
    authenticated: true
  },
}
