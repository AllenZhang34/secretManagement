import request from '@/utils/request'

export function fetchKeyList(query) {
  return request({
    url: '/vue-element-template/keymanagement/list',
    method: 'get',
    params: query
  })
}