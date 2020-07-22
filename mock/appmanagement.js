const Mock = require('mockjs')

const List = []
const count = 50

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    appName: '@first',
    username: '@first',
    'appType|1': ["类型1", "类型2"],
    'appSystem|1': ['系统1', '系统2'],
    'status|1': ['active', 'inactive'],
    certificateTimestamp: +Mock.Random.date('T'),
    pageviews: '@integer(300, 5000)'
  }))
}

module.exports = [
  {
    url: '/vue-element-template/appmanagement/list',
    type: 'get',
    response: config => {
      const { appName, page = 1, limit = 20 } = config.query

      let mockList = List.filter(item => {
        if (appName && item.appName.indexOf(appName) < 0) return false
        return true
      })

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/vue-element-template/appmanagement/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const appName of List) {
        if (appName.id === +id) {
          return {
            code: 20000,
            data: appName
          }
        }
      }
    }
  },

  {
    url: '/vue-element-template/appmanagement/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/vue-element-template/appmanagement/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-template/appmanagement/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-template/appmanagement/[A-Za-z0-9]',
    type: 'delete',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

]

