const Mock = require('mockjs')

const List = []
const count = 50

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    appSystemTimestamp: +Mock.Random.date('T'),
    appSystemName: '@first',
    username: '@first',
    'appSystemType|1': ['类型1', '类型2'],
    'connectSystem|1': ['系统1', '系统2'],
    'appSystemStatus|1': ['active', 'inactive'],
    certificateTimestamp: +Mock.Random.date('T')
  }))
}

module.exports = [
  {
    url: '/vue-element-template/appmanagement/list',
    type: 'get',
    response: config => {
      const { appSystemName, page = 1, limit = 20 } = config.query

      const mockList = List.filter(item => {
        if (appSystemName && item.appSystemName.indexOf(appSystemName) < 0) return false
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
  }

]

