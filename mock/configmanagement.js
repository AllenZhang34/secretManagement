const Mock = require('mockjs')

const List = []
const count = 30

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    configId: '@increment',
    configName: '@first',
    configDescription: '@cparagraph(2)'
  }))
}

module.exports = [
  {
    url: '/vue-element-template/configmanagement/connectSystemList',
    type: 'get',
    response: config => {
      const { configName, page = 1, limit = 20 } = config.query

      const mockList = List.filter(item => {
        if (configName && item.configName.indexOf(configName) < 0) return false
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
    url: '/vue-element-template/configmanagement/appTypeList',
    type: 'get',
    response: config => {
      const { configName, page = 1, limit = 20 } = config.query

      const mockList = List.filter(item => {
        if (configName && item.configName.indexOf(configName) < 0) return false
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
    url: '/vue-element-template/configmanagement/cipherMachineList',
    type: 'get',
    response: config => {
      const { configName, page = 1, limit = 20 } = config.query

      const mockList = List.filter(item => {
        if (configName && item.configName.indexOf(configName) < 0) return false
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
    url: '/vue-element-template/configmanagement/createConnectSystem',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/vue-element-template/configmanagement/createAppType',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/vue-element-template/configmanagement/createCipherMachine',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/vue-element-template/configmanagement/updateConnectSystem',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/vue-element-template/configmanagement/updateAppType',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/vue-element-template/configmanagement/updateCipherMachine',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/vue-element-template/configmanagement/deleteConnectSystem',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/vue-element-template/configmanagement/deleteAppType',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/vue-element-template/configmanagement/deleteCipherMachine',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

