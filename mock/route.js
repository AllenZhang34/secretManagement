const constantRoutes = [
    {
      path: '/redirect',
      component: 'layout/Layout',
      hidden: true,
      children: [
        {
          path: '/redirect/:path*',
          component: 'views/redirect/index'
        }
      ]
    },
    {
      path: '/login',
      component: 'views/login/index',
      hidden: true
    },
    {
      path: '/auth-redirect',
      component: 'views/login/auth-redirect',
      hidden: true
    },
    {
      path: '/404',
      component: 'views/error-page/404',
      hidden: true
    },
    {
      path: '/401',
      component: 'views/error-page/401',
      hidden: true
    },
    {
      path: '',
      component: 'layout/Layout',
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          component: 'views/dashboard/index',
          name: 'Dashboard',
          meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
        }
      ]
    }
  ]
  
  const asyncRoutes = [
    {
      path: '/secretKeyManagement',
      component: 'layout/Layout',
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
          meta: { title: '密钥生命周期' }
        }
      ]
    },
    {
      path: '/appManagement',
      component: 'layout/Layout',
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
      component: 'layout/Layout',
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
      component: 'layout/Layout',
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
      component: 'layout/Layout',
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
  
    { path: '*', redirect: '/404', hidden: true }
  ]
  
  module.exports = {
    constantRoutes,
    asyncRoutes
  }