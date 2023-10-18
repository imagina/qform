import appConfig from 'src/config/app'

export default {
  fillForm: {
    permission: 'iforms.leads.create',
    activated: true,
    path: '/form/fill-form/:id',
    name: 'qform.main.fillForm',
    page: () => import('@imagina/qform/_pages/main/fillForm'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'iforms.cms.sidebar.adminField',
    icon: 'fas fa-grip-horizontal',
    authenticated: true
  }
}
