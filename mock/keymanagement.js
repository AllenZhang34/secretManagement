const Mock = require('mockjs')

const List = []
const count = 50

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    keyID: '@increment',
    keyTimestamp: +Mock.Random.date('T'),
    keyLength: '@integer(1, 100)',
    keyName: '@first',
    'keyType|1': ['签名', '加密'],
    'keyStatus|1': ['有效', '失效', '归档', '作废'],
    createTimestamp: +Mock.Random.date('T'),
    pageviews: '@integer(300, 5000)'
  }))
}

module.exports = [
  {
    url: '/vue-element-template/keymanagement/list',
    type: 'get',
    response: config => {
      const { keyName, keyStatus, page = 1, limit = 20 } = config.query

      const mockList = List.filter(item => {
        if (keyName && item.keyName.indexOf(keyName) < 0) return false
        if (keyStatus && item.keyStatus !== keyStatus) return false
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
  }
]

