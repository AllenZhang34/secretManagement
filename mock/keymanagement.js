const Mock = require('mockjs')

const List = []
const count = 50

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    keyId: '@increment',
    timestamp: +Mock.Random.date('T'),
    keyLength: '@integer(1, 100)',
    keyName: '@first',
    'keyType|1': ["签名", "加密"],
    'keyStatus|1': ['有效', '失效' ,'归档','作废'],
    createTimestamp: +Mock.Random.date('T'),
    pageviews: '@integer(300, 5000)'
  }))
}

module.exports = [
  {
    url: '/vue-element-template/keymanagement/list',
    type: 'get',
    response: config => {
      const { keyId, page = 1, limit = 20 } = config.query

      let mockList = List.filter(item => {
        if (keyId && item.keyId.indexOf(keyId) < 0) return false
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

