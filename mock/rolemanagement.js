const Mock = require('mockjs')



const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

const roles = [
  {
    id: 1,
    rolename: 'admin',
    description: 'Super Administrator. Have access to view all pages.',
    roleobject: ''
  },
  {
    id: 2,
    rolename: 'editor',
    description: 'Normal Editor. Can see all pages except permission page',
    roleobject: ''
  },
  {
    id: 3,
    rolename: 'visitor',
    description: 'Just a visitor. Can only see the home page and the document page',
    roleobject: ''
  }
]

module.exports = [
  {
    url: '/vue-element-template/rolemanagement/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: roles
      }
    }
  },
  {
    url: '/vue-element-template/rolemanagement/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-template/rolemanagement/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-template/rolemanagement/[A-Za-z0-9]',
    type: 'delete',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

]

