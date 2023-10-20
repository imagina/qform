import appConfig from 'src/config/app'

export default {
  fillForm: {
    permission: 'iforms.leads.create',
    activated: true,
    path: '/form/lead/create/:id',
    name: 'qform.main.leads.create',
    page: () => import('@imagina/qform/_pages/main/fillForm'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'iforms.cms.fillForm',
    icon: 'fas fa-grip-horizontal',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb: ['qform.forms']
    }
  }
}
