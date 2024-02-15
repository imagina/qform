import appConfig from 'src/setup/app'

export default {
  fillForm: {
    permission: 'iforms.leads.create',
    activated: true,
    path: '/form/lead/create/:id',
    name: 'qform.main.leads.create',
    page: () => import('modules/qform/_pages/main/fillForm'),
    layout: () => import('layouts/master.vue'),
    title: 'iforms.cms.fillForm',
    icon: 'fas fa-grip-horizontal',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb: ['qform.forms']
    }
  },
  fillFormPublic: {
    permission: null,
    activated: true,
    path: '/form/lead/create-public/:id',
    name: 'qform.main.leads.create.public',
    page: () => import('modules/qform/_pages/main/fillForm'),
    layout: () => import('layouts/blank.vue'),
    title: 'iforms.cms.fillForm',
    icon: 'fas fa-grip-horizontal',
    authenticated: false,
    useCaptcha: true,
    subHeader: {
      refresh: true,
      breadcrumb: ['qform.forms']
    }
  }
}
