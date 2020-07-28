const Mock = require('mockjs')

const List = []
const count = 50

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    certificateName: '@first',
    'certificateType|1': ['应用证书', '用户证书'],
    'systemType|1': ['系统1', '系统2'],
    'certificateStatus|1': ['有效', '失效'],
    certificateTimestamp: +Mock.Random.date('T'),
    pageviews: '@integer(300, 5000)'
  }))
}

module.exports = [
  {
    url: '/vue-element-template/certificatemanagement/list',
    type: 'get',
    response: config => {
      const { certificateName, page = 1, limit = 20 } = config.query

      const mockList = List.filter(item => {
        if (certificateName && item.certificateName.indexOf(certificateName) < 0) return false
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
    url: '/vue-element-template/certificatemanagement/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-template/certificatemanagement/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

