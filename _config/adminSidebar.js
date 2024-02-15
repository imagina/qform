import pages from 'src/setup/pages' // Get Pages from config

//Forms
export default [
  {
    title: 'iforms.cms.sidebar.adminGroup',
    icon: 'fa-light fa-clipboard-list-check',
    children: [
      pages.qform.forms,
      pages.qform.leads,
    ]
  },
]
