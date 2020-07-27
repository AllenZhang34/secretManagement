const Mock = require('mockjs')

const { deepClone } = require('./utils')
const { asyncRoutes, constantRoutes } = require('./route.js')

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [
  {
    id: 'admin',
    rolename: 'admin',
    description: 'Super Administrator. Have access to view all pages.',
    routes: routes
  },
  {
    id: 'editor',
    rolename: 'editor',
    description: 'Normal Editor. Can see all pages except permission page',
    routes: routes.filter(i => i.path !== '/permission')// just a mock
  },
  {
    id: 'visitor',
    rolename: 'visitor',
    description: 'Just a visitor. Can only see the home page and the document page',
    routes: [{
      path: '',
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard' }
        }
      ]
    }]
  }
]

module.exports = [
  {
    url: '/vue-element-template/rolemanagement/routes',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: routes
      }
    }
  },
  {
    url: '/vue-element-template/rolemanagement/roles',
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
  }
]

