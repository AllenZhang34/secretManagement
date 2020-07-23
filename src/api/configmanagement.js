import request from '@/utils/request'

export function fetchConfigList(query) {
  return request({
    url: '/vue-element-template/configmanagement/list',
    method: 'get',
    params: query
  })
}

export function createConfig(data) {
  return request({
    url: '/vue-element-template/configmanagement/create',
    method: 'post',
    data
  })
}

export function updateConfig(data) {
  return request({
    url: '/vue-element-template/configmanagement/update',
    method: 'post',
    data
  })
}

export function deleteConfig(id) {
  return request({
    url: `/vue-element-template/configmanagement/${id}`,
    method: 'delete'
  })
}