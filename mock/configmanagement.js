const Mock = require('mockjs')

const List = []
const count = 30

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: '@first',
    description:'@cparagraph(3)',
    'type|1': ['1', '2', '3'],
  }))
}

module.exports = [
  {
    url: '/vue-element-template/configmanagement/list',
    type: 'get',
    response: config => {
      const { type} = config.query

      let mockList = List.filter(item => {
        if (type && item.type !== type) return false
        return true
      })
      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: mockList
        }
      }
    }
  },
  {
    url: '/vue-element-template/configmanagement/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-template/configmanagement/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

