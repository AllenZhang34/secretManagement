import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  }
]

export const asyncRoutes = [
  {
    path: '/secretKeyManagement',
    component: Layout,
    redirect: '/secretKeyManagement',
    meta: { title: '密钥管理', icon: 'lock' },
    children: [
      {
        path: 'certificateManagement',
        name: 'CertificateManagement',
        component: () => import('@/views/secretKeyManagement/certificateManagement'),
        meta: { title: '证书管理' }
      },
      {
        path: 'keylifeCircle',
        name: 'KeyifeCircle',
        component: () => import('@/views/secretKeyManagement/keylifeCircle'),
        meta: { title: '密钥清单' }
      }
    ]
  },
  {
    path: '/appManagement',
    component: Layout,
    redirect: '/appManagement',
    meta: { title: '应用管理', icon: 'app' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/appManagement/user'),
        meta: { title: '应用用户管理' }
      },
      {
        path: 'systemConfig',
        name: 'SystemConfig',
        component: () => import('@/views/appManagement/systemConfig'),
        meta: { title: '应用系统管理' }
      }
    ]
  },
  {
    path: '/logManagement',
    component: Layout,
    redirect: '/logManagement',
    meta: { title: '日志管理', icon: 'log' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/blank'),
        meta: { title: '日志查询' }
      },
      {
        path: 'analysis',
        name: 'Analysis',
        component: () => import('@/views/blank'),
        meta: { title: '报表分析' }
      },
      {
        path: 'config',
        name: 'Config',
        component: () => import('@/views/blank'),
        meta: { title: '日志配置' }
      }
    ]
  },
  {
    path: '/audit',
    component: Layout,
    redirect: '/audit',
    meta: { title: '审计分析', icon: 'audit' },
    children: [
      {
        path: 'serviceAudit',
        name: 'ServiceAudit',
        component: () => import('@/views/blank'),
        meta: { title: '密码服务审计' }
      },
      {
        path: 'keyUsageAudit',
        name: 'KeyUsageAudit',
        component: () => import('@/views/blank'),
        meta: { title: '密钥使用审计' }
      },
      {
        path: 'report',
        name: 'Report',
        component: () => import('@/views/blank'),
        meta: { title: '报表分析' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system',
    meta: { title: '系统设置', icon: 'system' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user'),
        meta: { title: '用户管理' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role'),
        meta: { title: '角色管理' }
      },
      {
        path: 'config',
        name: 'Config',
        component: () => import('@/views/system/config'),
        meta: { title: '配置管理' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
